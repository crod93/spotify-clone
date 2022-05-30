import useSWR from 'swr';
import fetcher from '../fetcher';

const usePlaylist = () => {
  const { data, error } = useSWR('/playlist', fetcher);

  return {
    playlist: data || [],
    isLoading: !data && !error,
    isError: error,
  };
};

export default usePlaylist;
