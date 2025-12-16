'use client'
import api from '@/shared/api/instance.api';
import React, { useEffect, useState } from 'react';
import { Loader2, MapPin, Users, Globe } from 'lucide-react';

interface Company {
  id: number;
  company_name: string;
  company_name_full: string;
  edrpou: string;
  id_company_form: number;
  id_country: number;
  is_carrier: boolean;
  is_client: boolean;
  is_expedition: boolean;
  address: string | null;
  gps_lat: number | null;
  gps_lon: number | null;
  black_list: boolean;
}

const CompanyGeneral = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  const getMyCompany = async () => {
    try {
      const res = await api.get('/company/my-company');
      setCompany(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyCompany();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );

  if (!company)
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Дані компанії не знайдено
      </div>
    );

  return (
    <div className="max-w-4xl  py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{company.company_name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Основна інформація */}
        <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Повна назва</h2>
            <p className="text-gray-700 dark:text-gray-200">{company.company_name_full}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">EDRPOU</h2>
            <p className="text-gray-700 dark:text-gray-200">{company.edrpou}</p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-200">
              {company.address || 'Не вказано'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span
              className={`px-2 py-1 rounded-full text-sm font-medium ${
                company.is_client ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
              }`}
            >
              Клієнт
            </span>
            <span
              className={`px-2 py-1 rounded-full text-sm font-medium ${
                company.is_carrier ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-600'
              }`}
            >
              Перевізник
            </span>
            <span
              className={`px-2 py-1 rounded-full text-sm font-medium ${
                company.is_expedition ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-600'
              }`}
            >
              Експедитор
            </span>
          </div>
          {company.black_list && (
            <div className="text-red-600 font-semibold">Компанія у чорному списку</div>
          )}
        </div>

        {/* Інша інформація / карта */}
        <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold mb-2">Інформація</h2>
          <p>
            <strong>Форма компанії:</strong> {company.id_company_form}
          </p>
          <p>
            <strong>Країна:</strong> {company.id_country}
          </p>
          {company.gps_lat && company.gps_lon && (
            <div>
              <h3 className="font-semibold mb-1">Координати:</h3>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span>
                  {company.gps_lat}, {company.gps_lon}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyGeneral;
