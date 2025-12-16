import api from "@/shared/api/instance.api";
import { TypeCreateCompanySchema } from "../schemas/create-company.schema";



class CompanyService {
  // 🔹 Створення нової компанії
  public async createNewCompany(values: TypeCreateCompanySchema) {
    console.log(values,'values from dto');
    
    const { data } = await api.post("/company/create", values);
    return data;
  }

  // 🔹 Можеш додати інші методи, наприклад список компаній
  public async getCompaniesList() {
    const { data } = await api.get("/company/list");
    return data;
  }
}

export const companyService = new CompanyService();
