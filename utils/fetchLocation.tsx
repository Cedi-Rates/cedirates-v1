'use client'
import React, { useState, useEffect } from 'react'
import { getAllRegions, getTownsFromRegion } from "./location";

interface Region {
    id: number;
    name: string;
}

interface Town {
    region_id: number;
    name: string;
}


export const fetchLocation = () => {
    const [regions, setRegions] = useState<Region[]>([]);
    const [selectedRegion, setSelectedRegion] = useState<string>("");
    const [selectedTown, setSelectedTown] = useState<string>("");
    const [selectedOtherRegion, setSelectedOtherRegion] = useState<string>("");
    const [selectedOtherTown, setSelectedOtherTown] = useState<string>("");
    const [towns, setTowns] = useState<Town[]>([]);


    useEffect(() => {
        const fetchRegions = async () => {
            const regionsData = getAllRegions();
            setRegions(regionsData);
        };
        fetchRegions();
    }, []);

    useEffect(() => {
        const fetchSelectedRegionTowns = async () => {
            if (selectedRegion) {
                const townsData = getTownsFromRegion(selectedRegion);
                    setTowns(townsData || []);
            }
        };
        fetchSelectedRegionTowns();
    }, [selectedRegion]);

    useEffect(() => {
        const fetchSelectedOtherRegionTowns = async () => {
            if (selectedOtherRegion) {
                const townsData = getTownsFromRegion(selectedOtherRegion);
                if (townsData) {
                    setTowns(townsData);
                } else {
                    setTowns([]);
                }           
            }
        };
        fetchSelectedOtherRegionTowns();
    }, [selectedOtherRegion]);

    const handleRegionSelect = (regionName: string) => {
        setSelectedRegion(regionName)
        setSelectedTown("")
    }

    const handleOtherRegionSelect = (otherRegionName: string) => {
        setSelectedOtherRegion(otherRegionName)
        setSelectedOtherTown("")
    }

    const handleTownSelect = (townName: string) => {
        setSelectedTown(townName)
    }

    const handleOtherTownSelect = (otherTownName: string) => {
        setSelectedOtherTown(otherTownName)
    }

  return { 
    regions, setRegions, towns, setTowns, selectedRegion, setSelectedRegion, selectedTown, 
    setSelectedTown, selectedOtherRegion, setSelectedOtherRegion, selectedOtherTown, setSelectedOtherTown, 
    handleRegionSelect, handleTownSelect, handleOtherRegionSelect, handleOtherTownSelect, 
  }
}
