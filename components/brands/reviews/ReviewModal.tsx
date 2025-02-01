"use client";
import React, { useState, useEffect } from "react";
import style from "../../../assets/styles/premiumListing.module.css";
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";
import ImageUpload from "../FileUploadModal";
import { XIcon } from "../../../assets/Icons";
import {
  // Drawer,
  // DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  // Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  CompleteCompanyDetailsType,
  ReviewType,
  UserDetailsType,
} from "@/utils/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check, SquarePen } from "lucide-react";
import { fetchLocation } from "@/utils/fetchLocation";
import { useFetchVehicles } from "@/utils/fetchVehicles";
import Image from "next/image";
import axios from "axios";
import ReactStars from "react-rating-star-with-type";
import { SpinnerCircular } from "spinners-react";
import { getReviews } from "@/utils/helpers/api";
import dynamic from "next/dynamic";
import { useToast } from "@/components/ui/use-toast";

const Dialog = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.Dialog),
  { ssr: false }
);
const DialogContent = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.DialogContent),
  { ssr: false }
);
const DialogClose = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.DialogClose),
  { ssr: false }
);
const DialogHeader = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.DialogHeader),
  { ssr: false }
);
const DialogDescription = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.DialogDescription),
  { ssr: false }
);
const DialogTitle = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.DialogTitle),
  { ssr: false }
);
const DialogTrigger = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.DialogTrigger),
  { ssr: false }
);
const DialogFooter = dynamic(
  () => import("@/components/ui/dialog").then((mod) => mod.DialogFooter),
  { ssr: false }
);
const Drawer = dynamic(
  () => import("@/components/ui/drawer").then((mod) => mod.Drawer),
  { ssr: false }
);
const DrawerClose = dynamic(
  () => import("@/components/ui/drawer").then((mod) => mod.DrawerClose),
  { ssr: false }
);
const Popover = dynamic(
  () => import("@/components/ui/popover").then((mod) => mod.Popover),
  { ssr: false }
);
const PopoverContent = dynamic(
  () => import("@/components/ui/popover").then((mod) => mod.PopoverContent),
  { ssr: false }
);
const PopoverTrigger = dynamic(
  () => import("@/components/ui/popover").then((mod) => mod.PopoverTrigger),
  { ssr: false }
);
const Command = dynamic(
  () => import("@/components/ui/command").then((mod) => mod.Command),
  { ssr: false }
);
const ScrollArea = dynamic(
  () => import("@/components/ui/scroll-area").then((mod) => mod.ScrollArea),
  { ssr: false }
);

interface AlertDialogDemoProps {
  triggerTitle?: string;
  companyDetails: CompleteCompanyDetailsType;
  user: UserDetailsType;
  reviews: ReviewType[];
  value: number;
  open: boolean;
  handleClose: (open: boolean) => void;
  setOpen?: (open: boolean) => void;
  setValue: (star: number) => void;
  setReviews: (allReviews: ReviewType[]) => void;
}

const ReviewModal: React.FC<AlertDialogDemoProps> = ({
  triggerTitle,
  companyDetails,
  user,
  reviews,
  value,
  setValue,
  open,
  handleClose,
  setOpen,
  setReviews,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [reviewText, setReviewText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [audioData, setAudioData] = useState(null);
  const [reviewEdit, setReviewEdit] = useState<string | null>(null);
  const [openTown, setOpenTown] = useState(false);
  const [openRegion, setOpenRegion] = useState(false);
  const [openYear, setOpenYear] = useState(false);
  const [openMake, setOpenMake] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [locationInfo, setLocationInfo] = useState({
    region: "",
    town: "",
  });
  const [vehicleInfo, setVehicleInfo] = useState<{
    year: number | null;
    make: string;
    model: string;
  }>({
    year: null,
    make: "",
    model: "",
  });
  const maxChars = 300;

  const {
    regions,
    setRegions,
    towns,
    setTowns,
    selectedRegion,
    setSelectedRegion,
    selectedTown,
    setSelectedTown,
    handleRegionSelect,
    handleTownSelect,
  } = fetchLocation();

  const {
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
    handleModel,
  } = useFetchVehicles(user);

  // const review = reviews.find((review) => review?.user?.userId === user._id);

  const review = Array.isArray(reviews)
    ? reviews.find((review) => review?.user?.userId === user._id)
    : null;

  const onChange = (nextValue: number) => {
    setValue(nextValue);
  };

  const removeImage = (index: number) => {
    setUploadedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleImageUpload = (file: File | null) => {
    if (file !== null) {
      setUploadedImages([file]);
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setReviewText(newText);

    setCharCount(newText.length);

    if (newText.length > maxChars) {
      setReviewText(newText.slice(0, maxChars));
      setCharCount(maxChars);
    }
  };

  const onSubmit = async () => {
    setLoading(true);

    const reviewObject = {
      review: reviewText,
      rating: value,
      companyId: companyDetails.company._id,
      location: {
        region: selectedRegion,
        town: selectedTown,
      },
      vehicle: companyDetails.company?.category === "fuelPrices" && {
        year: selectedYear,
        make: selectedMake,
        model: selectedModel,
      },
    };

    const formData = new FormData();
    uploadedImages?.map((item, index) =>
      formData.append(`image${index + 1}`, uploadedImages[index])
    );

    formData.append("data", JSON.stringify(reviewObject));

    const resData = await getReviews(companyDetails.company._id);
    setReviews(resData);

    if (reviewText.trim() === "") {
      toast({
        variant: "destructive",
        title: "Review cannot be empty",
      });
      setLoading(false);
      return;
    }

    if (reviewText.length <= 10) {
      toast({
        variant: "destructive",
        title: "Review must be more than 10 characters long.",
      });
      setLoading(false);
      return;
    }

    if (!value) {
      toast({
        variant: "destructive",
        title: "Please select a rating",
      });
      setLoading(false);
      return;
    }

    if (!user?.firstName || !user?.lastName) {
      setErrorModal(true);
      return;
    }

    if (review?.review) {
      setReviewEdit(reviewText);
    }

    try {
      await axios.post("/api/v1/reviews/add-review", formData);
      toast({
        variant: "success",
        title: "Thanks for your feedback",
      });
      handleClose(false);
      setLoading(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "🤦‍♂️ Uh oh! Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (review?.review) {
      setReviewText(review.review);
      setCharCount(review?.review.length);
    }
  }, [review?.review]);

  useEffect(() => {
    setValue(review?.rating || 0);
  }, [review?.rating, setValue]);

  useEffect(() => {
    setSelectedRegion(locationInfo.region || user?.homeLocation?.region);
    setSelectedTown(locationInfo.town || user?.homeLocation?.town);
    setSelectedMake(vehicleInfo.make || user?.vehicle?.make);
    setSelectedYear(vehicleInfo.year || user?.vehicle?.year);
    setSelectedModel(vehicleInfo.model || user?.vehicle?.model);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationInfo, vehicleInfo, user.homeLocation, user.vehicle]);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex items-center">
          {/* <LuPenSquare /> */}
          <SquarePen />
          <p className={style["write-review-text"]}>{triggerTitle}</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className={style["modal-header"]}>
                <p className={style["review-text"]}>
                  {review ? "Edit Review" : "Write a Review"}
                </p>
              </div>
            </DialogTitle>
            <DialogDescription>
              <div className="review-modal">
                {/* {!showEditTextArea && ( */}
                <>
                  <div className={style["modal-rating"]}>
                    <div className={style.stars}>
                      <ReactStars
                        isEdit={true}
                        value={value}
                        onChange={onChange}
                        size={20}
                        activeColor="#faaf00"
                      />
                    </div>
                    <p className={style["tap-to-rate"]}>Tap a Star to Rate</p>
                  </div>

                  <div className={style.textAreaAndDiv}>
                    <div className={style.ratingTextAreaDiv}>
                      <textarea
                        id={style.textarea}
                        placeholder="Leave a review"
                        onChange={handleTextAreaChange}
                        value={reviewText}
                        // hidden={audioData}
                        minLength={10}
                        className="text-base"
                      />
                      <div className={style.bottomTextArea}>
                        <div className={style.uploadedPreviewImages}>
                          <p
                            className={
                              charCount >= maxChars
                                ? `${style["total-characters"]} ${style["limit-reached"]}`
                                : `${style["total-characters"]}`
                            }
                          >
                            {`${charCount}/${maxChars}`}
                          </p>
                          {uploadedImages &&
                            uploadedImages.map((image, index) => (
                              <div
                                key={index}
                                className={style.uploadedImagePreview}
                              >
                                <Image
                                  src={URL.createObjectURL(image)}
                                  alt={`Preview ${image.name}`}
                                  className={style.uploadedImage}
                                  width={100}
                                  height={100}
                                />
                                <div className={style.overlay}>
                                  <XIcon
                                    type="default"
                                    onClick={() => removeImage(index)}
                                  />
                                </div>
                              </div>
                            ))}
                        </div>
                        <div className={style.iconTextAreaButtons}>
                          <ImageUpload
                            open={true}
                            handleClose={handleClose}
                            handleUpload={handleImageUpload}
                          />
                        </div>
                      </div>
                    </div>

                    <div className={style["extra-info-group"]}>
                      <label>Where are you writing the review from?</label>

                      <div className={style["location-info input-info"]}>
                        <div>
                          <Drawer>
                            <DrawerTrigger className="mt-2 w-full">
                              <Button
                                className="w-full text-[#1896fe] border-[#1896fe]"
                                variant="outline"
                              >
                                {selectedTown ? selectedTown : "Add Location"}
                              </Button>
                            </DrawerTrigger>
                            <DrawerContent className="max-w-lg m-auto p-5">
                              <DrawerHeader>
                                <DrawerTitle className="text-center">
                                  Where do you stay?
                                </DrawerTitle>
                                <DrawerDescription>
                                  <div className="mt-3 flex justify-center">
                                    <Popover
                                      open={openRegion}
                                      onOpenChange={setOpenRegion}
                                    >
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant="outline"
                                          role="combobox"
                                          aria-expanded={openRegion}
                                          className="w-full justify-between"
                                        >
                                          {/* {selectedRegion || "Region"} */}
                                          {selectedRegion
                                            ? selectedRegion
                                            : "Select Region"}
                                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="max-w-[450px] sm:w-[440px] h-80 p-0">
                                        <Command>
                                          <CommandInput placeholder="Search Region..." />
                                          <CommandEmpty>
                                            No Region found.
                                          </CommandEmpty>
                                          <CommandGroup>
                                            {regions.map((region) => (
                                              <CommandItem
                                                key={region.id}
                                                value={region.name}
                                                onSelect={() => {
                                                  handleRegionSelect(
                                                    region.name
                                                  );
                                                  setLocationInfo({
                                                    ...locationInfo,
                                                    region: region?.name,
                                                  });
                                                  setOpenRegion(false);
                                                }}
                                              >
                                                <Check
                                                  className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedRegion ===
                                                      region.name
                                                      ? "opacity-100"
                                                      : "opacity-0"
                                                  )}
                                                />
                                                {region.name}
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </Command>
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                  <div className="mt-3 flex justify-center">
                                    <Popover
                                      open={openTown}
                                      onOpenChange={setOpenTown}
                                    >
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant="outline"
                                          role="combobox"
                                          aria-expanded={openTown}
                                          className="w-full justify-between"
                                        >
                                          {/* {selectedTown || "Town"} */}
                                          {selectedTown
                                            ? selectedTown
                                            : "Select Town"}
                                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="max-w-[450px] sm:w-[440px] h-80 p-0">
                                        <Command>
                                          <CommandInput placeholder="Search Town..." />
                                          <CommandEmpty>
                                            No Town found.
                                          </CommandEmpty>
                                          <CommandGroup>
                                            {towns.map((town) => (
                                              <CommandItem
                                                key={town.region_id}
                                                value={town.name}
                                                onSelect={() => {
                                                  handleTownSelect(town.name);
                                                  setLocationInfo({
                                                    ...locationInfo,
                                                    town: town?.name,
                                                  });
                                                  setOpenTown(false);
                                                }}
                                              >
                                                <Check
                                                  className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedTown === town.name
                                                      ? "opacity-100"
                                                      : "opacity-0"
                                                  )}
                                                />
                                                {town.name}
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </Command>
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                </DrawerDescription>
                              </DrawerHeader>
                              <DrawerFooter>
                                <DrawerClose>
                                  <Button
                                    className="rounded-lg disabled:bg-gray-400 text-white px-4 w-full"
                                    type="submit"
                                    disabled={!(selectedRegion && selectedTown)}
                                  >
                                    <DrawerClose>Save and Close</DrawerClose>
                                  </Button>
                                </DrawerClose>
                              </DrawerFooter>
                            </DrawerContent>
                          </Drawer>
                        </div>
                      </div>

                      {companyDetails.company?.category === "fuelPrices" && (
                        <div className="mt-3">
                          <label>What vehicle do you use?</label>
                          <div>
                            <Drawer>
                              <DrawerTrigger className="mt-2 w-full">
                                <Button
                                  className="w-full text-[#1896fe] border-[#1896fe]"
                                  variant="outline"
                                >
                                  {selectedYear
                                    ? `${selectedYear} ${selectedMake} ${selectedModel}`
                                    : "Add Vehicle"}
                                </Button>
                              </DrawerTrigger>
                              <DrawerContent className="max-w-lg m-auto p-5">
                                <DrawerHeader>
                                  <DrawerTitle className="mb-2">
                                    Add your main car
                                  </DrawerTitle>
                                  <DrawerDescription>
                                    <Popover
                                      open={openYear}
                                      onOpenChange={setOpenYear}
                                    >
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant="outline"
                                          role="combobox"
                                          aria-expanded={openYear}
                                          className="w-full justify-between"
                                        >
                                          {selectedYear
                                            ? selectedYear
                                            : "Select Year"}
                                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="max-w-[450px] sm:w-[440px] h-80 p-0">
                                        <Command>
                                          <CommandInput placeholder="Search Year..." />
                                          <CommandEmpty>
                                            No Year found.
                                          </CommandEmpty>
                                          <CommandGroup>
                                            <ScrollArea className="h-72 rounded-md border">
                                              {Array.isArray(years) &&
                                                years.map((year) => (
                                                  <CommandItem
                                                    key={year}
                                                    value={year.toString()}
                                                    onSelect={() => {
                                                      handleYear(year);
                                                      setVehicleInfo(
                                                        (prevVehicleInfo) => ({
                                                          ...prevVehicleInfo,
                                                          year: year,
                                                        })
                                                      );
                                                      setOpenYear(false);
                                                    }}
                                                  >
                                                    <Check
                                                      className={cn(
                                                        "mr-2 h-4 w-4",
                                                        selectedYear === year
                                                          ? "opacity-100"
                                                          : "opacity-0"
                                                      )}
                                                    />
                                                    {year}
                                                  </CommandItem>
                                                ))}
                                            </ScrollArea>
                                          </CommandGroup>
                                        </Command>
                                      </PopoverContent>
                                    </Popover>
                                    <div className="my-3">
                                      <Popover
                                        open={openMake}
                                        onOpenChange={setOpenMake}
                                      >
                                        <PopoverTrigger asChild>
                                          <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openMake}
                                            className="w-full justify-between"
                                          >
                                            {selectedMake || "Select Make"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                          </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="max-w-[450px] sm:w-[440px] h-80 p-0">
                                          <Command>
                                            <CommandInput placeholder="Search Make..." />
                                            <CommandEmpty>
                                              No Make found.
                                            </CommandEmpty>
                                            <CommandGroup>
                                              <ScrollArea className="h-72 rounded-md border">
                                                {makes?.map((make) => (
                                                  <CommandItem
                                                    key={make}
                                                    value={make}
                                                    onSelect={() => {
                                                      handleMake(make);
                                                      setVehicleInfo(
                                                        (prevVehicleInfo) => ({
                                                          ...prevVehicleInfo,
                                                          make: make,
                                                        })
                                                      );
                                                      setOpenMake(false);
                                                    }}
                                                  >
                                                    <Check
                                                      className={cn(
                                                        "mr-2 h-4 w-4",
                                                        selectedMake === make
                                                          ? "opacity-100"
                                                          : "opacity-0"
                                                      )}
                                                    />
                                                    {make}
                                                  </CommandItem>
                                                ))}
                                              </ScrollArea>
                                            </CommandGroup>
                                          </Command>
                                        </PopoverContent>
                                      </Popover>
                                    </div>
                                    <Popover
                                      open={openModel}
                                      onOpenChange={setOpenModel}
                                    >
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant="outline"
                                          role="combobox"
                                          aria-expanded={openModel}
                                          className="w-full justify-between"
                                        >
                                          {selectedModel || "Select Model"}
                                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="max-w-[450px] sm:w-[440px] h-80 p-0">
                                        <Command>
                                          <CommandInput placeholder="Search Model..." />
                                          <CommandEmpty>
                                            No Model found.
                                          </CommandEmpty>
                                          <CommandGroup>
                                            <ScrollArea className="h-72 rounded-md border">
                                              {modelsArray?.map((model) => (
                                                <CommandItem
                                                  key={model.value}
                                                  value={model.label}
                                                  onSelect={() => {
                                                    handleModel(model.label);
                                                    setVehicleInfo(
                                                      (prevVehicleInfo) => ({
                                                        ...prevVehicleInfo,
                                                        model: model.label,
                                                      })
                                                    );
                                                    setOpenModel(false);
                                                  }}
                                                >
                                                  <Check
                                                    className={cn(
                                                      "mr-2 h-4 w-4",
                                                      selectedMake ===
                                                        model.label
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                    )}
                                                  />
                                                  {model.label}
                                                </CommandItem>
                                              ))}
                                            </ScrollArea>
                                          </CommandGroup>
                                        </Command>
                                      </PopoverContent>
                                    </Popover>
                                  </DrawerDescription>
                                </DrawerHeader>
                                <DrawerFooter>
                                  <Button
                                    className="rounded-lg disabled:bg-gray-400 text-white px-4 w-full"
                                    type="submit"
                                    disabled={
                                      !(
                                        selectedYear &&
                                        selectedMake &&
                                        selectedModel
                                      )
                                    }
                                  >
                                    <DrawerClose>Save and Close</DrawerClose>
                                  </Button>
                                </DrawerFooter>
                              </DrawerContent>
                            </Drawer>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="rounded-lg disabled:bg-gray-400 text-white px-4 w-full md:w-[125px]"
              disabled={
                loading ||
                !value ||
                !reviewText ||
                selectedTown === "" ||
                (companyDetails.company?.category === "fuelPrices" &&
                  selectedMake === "" &&
                  selectedModel === "" &&
                  selectedYear === null)
              }
              onClick={() => onSubmit()}
            >
              {loading ? (
                <SpinnerCircular
                  size={24}
                  thickness={200}
                  color="white"
                  className="mr-2"
                />
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewModal;
