import { useQuery } from '@tanstack/react-query';
import { Transport } from '../types/transport.type';
import { getTransport } from '../services/transport.service';

export const useTransportQuery = (type: 'TRUCK' | 'TRAILER') => {
  return useQuery({
    queryKey: ['transport', type],
    queryFn: () => getTransport(type),

  });
};
