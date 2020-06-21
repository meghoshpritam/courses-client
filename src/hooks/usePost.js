import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setError, setLoading, setSuccess, reset } from '../store/Slices/apiCall';
import { format } from '../assets/functions/errorFormat';

export default () => {
  const [err, setErr] = useState(null);
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();

  const cb = async (url, data, config = {}) => {
    dispatch(setLoading());
    try {
      const res = await axios.post(url, data, config);
      setResponse(res.data);
      setErr(null);
      dispatch(setSuccess());
    } catch (error) {
      console.dir(error);
      if (error.response.status === 422) {
        setErr(format(error.response.data.errors));
      } else if (error.response.status === 429) {
        setErr({ error: error.response.data });
      }
      setSuccess(null);
      dispatch(setError());
    }
  };

  return [response, err, cb];
};
