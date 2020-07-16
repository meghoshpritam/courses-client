import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setError, setLoading, setSuccess, reset } from '../store/Slices/apiCall';
import { format } from '../assets/functions/errorFormat';

export default () => {
  const [err, setErr] = useState(null);
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const cb = async (
    url,
    params = {},
    config = {
      headers: {
        authorization: localStorage.getItem('accessToken'),
      },
    }
  ) => {
    dispatch(setLoading());
    try {
      const res = await axios.get(url, { ...config, params });
      setResponse(res.data);
      setErr(null);
      dispatch(setSuccess());
    } catch (error) {
      console.dir(error);
      if (error?.message === 'Network Error' && error.response === undefined) {
        setErr({ error: 'Network Error' });
      }
      if (error?.response?.status === 401) {
        console.log('try');
        try {
          const tokenRes = await axios.post('/auth/generate-access-token', {
            refreshToken: localStorage.getItem('refreshToken'),
          });
          localStorage.setItem('accessToken', tokenRes.data.accessToken);
          setSuccess(null);
          setErr(null);
          dispatch(reset());
          console.log('done');
        } catch (e) {
          console.log('err');
          localStorage.clear();
          history.replace('/unauthorized');
        }
      } else if (error?.response?.status === 422) {
        setErr(format(error?.response?.data?.errors));
      } else if (error?.response?.status === 429) {
        setErr({ error: error?.response?.data });
      }
      setSuccess(null);
      dispatch(setError());
    }
  };

  return [response, err, cb];
};
