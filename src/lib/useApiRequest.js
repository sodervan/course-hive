import { ref } from 'vue';

export function useApiRequest() {
  const isLoading = ref(false);

  const makeRequest = async (url, method, body) => {
    isLoading.value = true;
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'omit',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, makeRequest };
}
