import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setError, setLoading, setSuccess, reset } from '../store/Slices/apiCall';
import { format } from '../assets/functions/errorFormat';

const handleError = async (error, dispatch, setErr, history) => {
  console.dir(error);
  if (error?.message === 'Network Error' && error.response === undefined) {
    setErr({ error: 'Network Error' });
  }
  if (error?.response?.status === 401) {
    try {
      const tokenRes = await axios.post('/auth/generate-access-token', {
        refreshToken: localStorage.getItem('refreshToken'),
      });
      localStorage.setItem('accessToken', tokenRes.data.accessToken);
      setSuccess(null);
      setErr(null);
      dispatch(reset());
    } catch (e) {
      localStorage.clear();
      history.replace('/unauthorized');
    }
  } else if (error?.response?.status === 422) {
    setErr(format(error?.response?.data?.errors));
    setSuccess(null);
    dispatch(setError());
  } else if (error?.response?.status === 429) {
    setErr({ error: error?.response?.data });
    setSuccess(null);
    dispatch(setError());
  } else {
    setSuccess(null);
    dispatch(setError());
  }
};

export const useGet = () => {
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
      handleError(error, dispatch, setErr, history);
    }
  };

  return [response, err, cb];
};

export const usePost = () => {
  const [err, setErr] = useState(null);
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const cb = async (
    url,
    data,
    config = {
      headers: {
        authorization: localStorage.getItem('accessToken'),
      },
    }
  ) => {
    dispatch(setLoading());
    try {
      const res = await axios.post(url, data, config);
      setResponse(res.data);
      setErr(null);
      dispatch(setSuccess());
    } catch (error) {
      handleError(error, dispatch, setErr, history);
    }
  };

  return [response, err, cb];
};

export const useDelete = () => {
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
      const res = await axios.delete(url, { ...config, params });
      setResponse({ msg: 'deleted' });
      setErr(null);
      dispatch(setSuccess());
    } catch (error) {
      handleError(error, dispatch, setErr, history);
    }
  };

  return [response, err, cb];
};

export const usePut = () => {
  const [err, setErr] = useState(null);
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const cb = async (
    url,
    data,
    config = {
      headers: {
        authorization: localStorage.getItem('accessToken'),
      },
    }
  ) => {
    dispatch(setLoading());
    try {
      const res = await axios.put(url, data, config);
      console.log('put res', res);
      setResponse(res.data);
      setErr(null);
      dispatch(setSuccess());
    } catch (error) {
      handleError(error, dispatch, setErr, history);
    }
  };

  return [response, err, cb];
};
