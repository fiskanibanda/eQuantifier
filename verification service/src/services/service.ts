import crypto from 'crypto' 
import { Injectable } from '@varbz/di'
import { Exception, ResCodes } from '@varbz/peeka'
import { Asynk, HttpInReq, AMQPInReq } from '@varbz/asynk'
import { verified } from '@varbz/equantifier_api_user_manager'
import { verify, verification, EmailVerification, MobileVerification } from '@varbz/equantifier_api_user_verification'
import { mongo } from '../api/index.js'

@Injectable
export class VerificationService { 

    svc = 'VerificationService'

    constructor(){}

	verify = async (asynk:Asynk,req:HttpInReq):Promise<boolean>=>{
        const caller = `${this.svc}.verify`
		try {
            const { data } = await asynk.json(req,verify.input)
            if(data.email) {
                const verification = await mongo.EmailVerificationModel.findOneAndUpdate({ 'email': data.email },{ $inc: { tries: 1 } })
                if(!verification) throw new Exception(caller,ResCodes.BAD_REQUEST,'Verification is invalid.')
                if(data.otp === verification.otp) {
                    await asynk.amqpOutReq(verified,verified.request({
                        'uid': verification.uid!,
                        'email': data.email,
                        'emailVerified': true
                    }),req.id)
                    await asynk.httpOutRes(req.id,ResCodes.OK,undefined)
                    await verification.delete()
                }
                else if(verification.tries >= 5) {
                    await verification.delete()
                    throw new Exception(caller,ResCodes.FORBIDDEN,'Too many tries, verification has been removed.')
                }
                else throw new Exception(caller,ResCodes.BAD_REQUEST,'Invalid OTP')
            }
            else if(data.mobile){
                const verification = await mongo.MobileVerificationModel.findOneAndUpdate({ 'mobile': data.mobile },{ $inc: { tries: 1 } })
                if(!verification) throw new Exception(caller,ResCodes.BAD_REQUEST,'Verification is invalid.')
                if(data.otp === verification.otp) {
                    await asynk.amqpOutReq(verified,verified.request({
                        'uid': verification.uid,
                        'mobile': data.mobile,
                        'mobileVerified': true
                    }),req.id)
                    await asynk.httpOutRes(req.id,ResCodes.OK,undefined)
                    await verification.delete()
                }
                else if(verification.tries >= 5) {
                    await verification.delete()
                    throw new Exception(caller,ResCodes.FORBIDDEN,'Too many tries, verification has been removed.')
                }
                else throw new Exception(caller,ResCodes.BAD_REQUEST,'Invalid OTP')
            }
			else throw new Exception(caller,ResCodes.BAD_REQUEST,'Invalid Verification Request')
		}
		catch(err){
            await asynk.httpOutError(err,req.id)
		}
        return true
	}

	verification = async (asynk:Asynk,req:AMQPInReq):Promise<boolean>=>{
        const caller = `${this.svc}.verification`
		try {
            const { otp, link } = this.otp()
            const { data } = await asynk.json(req,verification.input,false)

            if(data.email)
                await mongo.EmailVerificationModel.findOneAndUpdate({ email: data.email },{ uid: data.uid, email: data.email, otp: otp }, { upsert: true })
            else if(data.mobile) 
                await mongo.MobileVerificationModel.findOneAndUpdate({ mobile: data.mobile },{ uid: data.uid, mobile: data.mobile, otp: otp }, { upsert: true })
            // const msg:EmailRequest<EmailTypes.EMAIL_VERIFICATION> = {
            //     recipientId: data.uid,
            //     source: EmailAddresses.NO_REPLY,
            //     subject: "Varbz Email Verification",
            //     type: EmailTypes.EMAIL_VERIFICATION,
            //     reply: false,
            //     receipt: undefined,
            //     data: { email: data.email, otp, link }
            // }
            // asynk.amqpOutReq(new AMQPOutReq('' as any,'services','email','email',msg,{ 'content-type': MIMETypes.JSON }))
            await asynk.amqpOutRes(req.id,200,verification.response({ 'uid': data.uid }))
		}
		catch(err){
			await asynk.outError(new Exception(caller,ResCodes.PASSTHROUGH,undefined,err),req)
		}
        return true
	}
	
    private otp = ()=>{
        const caller = `${this.svc}.otp`
        try {
            let otp = ''
            while(otp.length < 4) otp+=`${crypto.randomInt(0,9)}`
            //link to html frontend.
            const link = `varbz.com/verification/${crypto.randomBytes(48).toString('base64url')}`
            return { otp, link }
        }
        catch(err){
            throw new Exception(caller,ResCodes.PASSTHROUGH,undefined,err)
        }
    }
	
}