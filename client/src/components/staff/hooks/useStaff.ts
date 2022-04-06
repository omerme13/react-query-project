import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useQuery } from 'react-query';

import type { Staff } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { filterByTreatment } from '../utils';

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

// for when we need a query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

export function useStaff(): UseStaff {
  const [filter, setFilter] = useState('all');

  const handleSelectCheckbox = useCallback(
    (data: Array<Staff>) => filterByTreatment(data, filter),
    [filter],
  );

  const { data: staff = [] } = useQuery(queryKeys.staff, getStaff, {
    select: filter !== 'all' && handleSelectCheckbox,
  });

  return { staff, filter, setFilter };
}
