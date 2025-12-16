import api from "@/shared/api/instance.api";
import { TypeCreateCompanySchema } from "../schemas";

class CompanyService {
  public async createNewCompany(values: TypeCreateCompanySchema) {
    const { data } = await api.post("/company/create", values);

    return data;
  }
}

export const companyService = new CompanyService();
