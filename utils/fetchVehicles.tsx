"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { UserDetailsType } from "./types";
import { getMakes, getModels, getYears } from "./helpers/api";

interface Model {
  value: string;
  label: string;
  model: string;
  _id: string;
}

export const useFetchVehicles = (user?: UserDetailsType) => {
  const [years, setYears] = useState<number[]>([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [modelsArray, setModelsArray] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    setModelsArray(
      models?.map(({ _id, model }) => ({ label: model, value: _id }))
    );
  }, [models]);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const data = await getYears();
        setYears(data);
        // console.log('All Years:', yearsData);
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    fetchYears();
  }, []);

  useEffect(() => {
    // Fetch makes based on the selected year
    const fetchMakes = async () => {
      if (selectedYear) {
        try {
          const data = await getMakes(selectedYear);
          setMakes(data);
          // console.log('All Makes:', makesData);
        } catch (error) {
          console.error("Error fetching makes data:", error);
        }
      }
    };

    fetchMakes();
  }, [selectedYear]);

  useEffect(() => {
    // Fetch models based on the selected year and make
    const fetchModels = async () => {
      if (selectedYear && selectedMake) {
        try {
          const data = await getModels(selectedYear, selectedMake)
          setModels(data);
          // console.log('All Models:', modelsData);
        } catch (error) {
          console.error("Error fetching models data:", error);
        }
      }
    };

    fetchModels();
  }, [selectedYear, selectedMake]);

  const handleYear = (year: number) => {
    setSelectedYear(year);
    setSelectedMake("");
    setSelectedModel("");
  };

  const handleMake = (make: string) => {
    setSelectedMake(make);
    setSelectedModel("");
  };

  const handleModel = (model: string) => {
    setSelectedModel(model);
  };

  return {
    years,
    makes,
    modelsArray,
    selectedYear,
    selectedMake,
    selectedModel,
    setSelectedYear,
    setSelectedMake,
    setSelectedModel,
    handleYear,
    handleMake,
    handleModel
  };
};
