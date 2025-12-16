import api from "@/shared/api/instance.api"

class VerificationService {

    public async newVerification(token:string | null) {
        const {data} = await api.post('/auth/email-confirmation',{token})
        console.log(data,'DATA');
        
        return data

    }
}

export const verificationService = new VerificationService()