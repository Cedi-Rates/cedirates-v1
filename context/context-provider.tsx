// CompanyDetailsContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface PersonalDetailsInterface {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
}

export interface CompanyDetailsInterface {
  companyName: string;
  image: File | string;
  category: string;
  subCategory: string;
}

export interface GeneralDetailsContextType {
  companyDetails: CompanyDetailsInterface;
  setCompanyDetails: React.Dispatch<
    React.SetStateAction<CompanyDetailsInterface>
  >;
  personalDetails: PersonalDetailsInterface;
  setPersonalDetails: React.Dispatch<
    React.SetStateAction<PersonalDetailsInterface>
  >;
}

const GeneralDetailsContext = createContext<
  GeneralDetailsContextType | undefined
>(undefined);

export const useGeneralDetails = (): GeneralDetailsContextType => {
  const context = useContext(GeneralDetailsContext);
  if (!context) {
    throw new Error(
      "useGeneralDetails must be used within a GeneralDetailsProvider"
    );
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const GeneralDetailsProvider = ({ children }: Props): JSX.Element => {
  const [companyDetails, setCompanyDetails] = useState<CompanyDetailsInterface>(
    {
      companyName: "",
      image: "",
      category: "",
      subCategory: "",
    }
  );

  const [personalDetails, setPersonalDetails] =
    useState<PersonalDetailsInterface>({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phone: "",
    });

  return (
    <GeneralDetailsContext.Provider
      value={{
        companyDetails,
        setCompanyDetails,
        personalDetails,
        setPersonalDetails,
      }}
    >
      {children}
    </GeneralDetailsContext.Provider>
  );
};
