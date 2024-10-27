import { backendData } from "./context.js";

export interface MyData {
  id: number;
  title: string;
  content: string;
  date: string;
}

export interface Response {
  result?: number | boolean;
  message?: string;
}

export function getDatajobs(): Promise<MyData[]> {
  let database: IDBOpenDBRequest = openDatabase();
  return new Promise((resolve, reject) => {
    database.onsuccess = (event: Event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const transaction: IDBTransaction = db.transaction(
        [backendData.registers[0]],
        "readonly"
      );
      const objectStore: IDBObjectStore = transaction.objectStore(
        backendData.registers[0]
      );
      const getAllRequest: IDBRequest<MyData[]> = objectStore.getAll();

      getAllRequest.onsuccess = (event: Event) => {
        resolve((event.target as IDBRequest).result as MyData[]);
      };

      getAllRequest.onerror = (event: Event) => {
        reject((event.target as IDBRequest).error);
      };
    };
  });
}

export function createjob(data: MyData): Promise<Response> {
  let database: IDBOpenDBRequest = openDatabase();
  return new Promise((resolve, reject) => {
    database.onsuccess = (event: Event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const transaction: IDBTransaction = db.transaction(
        [backendData.registers[0]],
        "readwrite"
      );
      const objectStore: IDBObjectStore = transaction.objectStore(
        backendData.registers[0]
      );
      const addRequest: IDBRequest = objectStore.add(data);

      addRequest.onsuccess = () => {
        resolve({ result: 200, message: "éxito." });
      };

      addRequest.onerror = () => {
        reject({ result: 500, message: "Petición denegada." });
      };
    };
  });
}

export function deletejob(id: number): Promise<Response> {
  let database: IDBOpenDBRequest = openDatabase();
  return new Promise((resolve, reject) => {
    database.onsuccess = (event: Event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const transaction: IDBTransaction = db.transaction(
        [backendData.registers[0]],
        "readwrite"
      );
      const objectStore: IDBObjectStore = transaction.objectStore(
        backendData.registers[0]
      );
      const deleteRequest: IDBRequest = objectStore.delete(id);

      deleteRequest.onsuccess = (event: Event) => {
        resolve({ result: 200, message: "éxito." });
      };

      deleteRequest.onerror = (event: Event) => {
        reject({ result: 404, message: "Recurso no encontrado." });
      };
    };
  });
}

function openDatabase(): IDBOpenDBRequest {
  const request: IDBOpenDBRequest = indexedDB.open(
    backendData.name,
    backendData.version
  );
  request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
    backendData.registers.forEach((name: string) => {
      const objectStore: IDBObjectStore = db.createObjectStore(name, {
        keyPath: "id",
      });
    });
  };

  return request;
}

export async function isEmptyDatabase(): Promise<Response> {
  try {
    return { result: !Boolean((await getDatajobs()).length) };
  } catch (error) {
    return { result: false };
  }
}

export async function existDatabase(): Promise<Response> {
  try {
    let data: IDBDatabaseInfo[] = await indexedDB.databases();
    return { result: data.some((object) => object.name === backendData.name) };
  } catch (error) {
    return { result: false };
  }
}

export async function getIdMax(): Promise<number> {
  let database: IDBOpenDBRequest = openDatabase();
  return new Promise((resolve, reject) => {
    database.onsuccess = (event: Event) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(
        [backendData.registers[0]],
        "readonly"
      );
      const objectStore = transaction.objectStore(backendData.registers[0]);
      let maxId = 0;

      const request = objectStore.openCursor();

      request.onsuccess = (event) => {
        const cursor = (event.target as any).result;
        if (cursor) {
          // Suponiendo que el ID está en cursor.value.id
          if (cursor.value.id > maxId) {
            maxId = cursor.value.id; // Actualizar maxId si se encuentra uno mayor
          }
          cursor.continue(); // Continuar con el siguiente registro
        } else {
          resolve(maxId);
        }
      };
    };
  });
}
