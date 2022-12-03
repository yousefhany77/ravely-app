import { getApps, getApp, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNe7q4EjoDR_x5dnXdxlbU1yYmvH99v-c",
  authDomain: "auth-fe87e.firebaseapp.com",
  projectId: "auth-fe87e",
  storageBucket: "auth-fe87e.appspot.com",
  messagingSenderId: "321612450940",
  appId: "1:321612450940:web:3d71cb6bc92f340a6f0df9",
  credential: cert({
    type: "service_account",
    project_id: "auth-fe87e",
    private_key_id: "32087dd518cbfe1845fc8d08477b33a217574f0f",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCUDat1N7REKr3U\nTJYoN/2FfukRFbk6+wXfWrpX3ZTd52mOuhI0IzCMi+rEdzACkxy7uUHWYPgr0egG\nYwe4LlkmoKYqKNuBgNU+m2v04kc5i51U/jUHTJXuNqprO7oHhw0CrKG4LQo80aCT\nd3HIF6l3i7zwo4RWNIOlctW/9mPsPEmBapco9TPFJE+xswZq6UiOFeyKTFXF6yl/\nWo9fBWkdilySkgobBpTCMMaCKe7OrDrBAsbbVdkN0YKiTgpxVOtYws8RokOmTIeE\n5BNKVae/UkcdvfS9NhA5pI+h9eZ6RDWgx2dYBJw/HoXOktyAWIidxTbrH4hoCJTE\n9s3J7EQrAgMBAAECggEAD9AUnlS7FzDCzPhPwq9AOlA0umi/O5JwrSC2mF3dNtou\n3Fn5ScJHFCvO1k8DPLMpCs/IPV+8Ad94ev4mu+rksLXQft5ARj5UCEzMpKoVALYY\nXBSOkLStqsoB56lzFAy+PKk4LetO6vIExttSDBSi5VbHxk01/DMTAHUZvq1P53zb\nT/ZMtwxFX3fgyhpkA/U/fclBv8nKUaPLElJTuiuJR0clv2NNOcKmB5yxb7vUbync\n0iHUz3qiCnD59bijEAPYwAor1HFUDrLThDjtDgoMAYUIjgaDMyDvX/oK3uviTE4x\nq7mrfGZOQyEOFtK0ZCLbFfX39ER1zHsG3QmLIvN30QKBgQDHKb4X8fuCiwXcPnPm\nXZYZryAdbRRKHy0GK7H0tA40NTAs0n6p/pAaWu3oTPqm7rgLBqx22isMxR9lbEs1\nJLSlJoUhGLmIw+QFi4dCT4TGbwyQU/cixUIu4YlAK8dkM7JrX1N6z8I7UBL/jrDg\npWQ+VNf6nGDJEvm8lj7pRFpD0wKBgQC+TgIgZGZV9k2YuAvbg2wY7QBVsIcyuFrN\nuquvzRdKEN86Af2tY1WCTkq3nqCp5CMAK7bqowL5pOiFMxZ3/VB66h8b8yMO4Tre\nZIe3/UZZ+/tex19e70empb+aR4wzifSybNQODhzOVSVM7oC3ObfvsyhXRxxMlHt0\nRkGui8o/SQKBgGk+nb15mjb50Db6qbRqcA9Sg94I7lfc8aX5ISj2nSrpkHOfKGAc\nrXm/40iGpU3hiFALTsffsjAlWtn1yChlJTDAkklTD3g+TBjCCs/3xWo29KSwOkCd\njMPJWwYWHF/PEdG7phmYAEPnpKJ3fPC5daeanidIy7x10pLdspECFdERAoGAcwNC\nVcFX9+v7yaixweETm5zg7ujZTNYOSvfee0lAIgtAXhaF8hxuuWoHziGYiBTQ8nF5\nAyWxzp7TyGyvz6TQ1vhYBNRVA9EreuzW+WOg+RFJQmbMRNvoOddCjUNggGWH9a3A\nGx58WlcrS+t470N63uswHk9j0wSJ+CPd3lety8ECgYA+sumJiwvd971ofSQ3+wG8\nvDKLKs64p5GWCHL1kaAikqf7QBpWbaNkyQH5pN9gVf5pjIg0R8SltX2DGRQmsjTK\n6SIrhI5dvadkaZJ1EDUelpB+Qi+k/MAO5UTBz06HC83p0onGWgchAI6qCTDEMTkF\niWF+LUyny0sj6rsDDlZJSA==\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-3fkln@auth-fe87e.iam.gserviceaccount.com",
    client_id: "116992539027001763754",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3fkln%40auth-fe87e.iam.gserviceaccount.com",
  }),
};

export const Admin_Firebase =
  getApps().length < 1 ? initializeApp(firebaseConfig) : getApp();
export const adminAuth = getAuth(Admin_Firebase);
export const db_Admin = getFirestore();

