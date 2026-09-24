import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getCurrentUserId() {
  return AsyncStorage.getItem('userToken');
}

export async function getUserDataKey(baseKey, userId) {
  const resolvedUserId = userId ?? (await getCurrentUserId());
  return `${baseKey}:${resolvedUserId || 'guest'}`;
}

export async function getUserData(baseKey, defaultValue = null) {
  try {
    const scopedKey = await getUserDataKey(baseKey);
    const scopedValue = await AsyncStorage.getItem(scopedKey);

    if (scopedValue !== null) {
      return scopedValue;
    }

    // Migra dados prototypes antigos para o escopo do usuário atual.
    const legacyValue = await AsyncStorage.getItem(baseKey);
    if (legacyValue !== null) {
      await AsyncStorage.setItem(scopedKey, legacyValue);
    }

    return legacyValue ?? defaultValue;
  } catch (error) {
    console.log(`Erro ao carregar ${baseKey}:`, error);
    return defaultValue;
  }
}

export async function setUserData(baseKey, value) {
  const scopedKey = await getUserDataKey(baseKey);
  await AsyncStorage.setItem(scopedKey, value);
}

export async function removeUserData(baseKey) {
  const scopedKey = await getUserDataKey(baseKey);
  await AsyncStorage.removeItem(scopedKey);
}

export async function getJsonUserData(baseKey, defaultValue) {
  const rawValue = await getUserData(baseKey, null);
  if (rawValue === null) {
    return defaultValue;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    console.log(`Erro ao interpretar ${baseKey}:`, error);
    return defaultValue;
  }
}

export async function setJsonUserData(baseKey, value) {
  await setUserData(baseKey, JSON.stringify(value));
}
