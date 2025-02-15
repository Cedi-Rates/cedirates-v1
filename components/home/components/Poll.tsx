"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { PollType, PollOptionType } from "@/utils/types";
import axios from "axios";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { SpinnerCircular } from "spinners-react";
import Confetti from "react-confetti";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  className?: string;
  pollData: PollType;
}

interface PollOptionProps {
  item: PollOptionType;
  selectedPollOption: (number | string)[];
  handleOption: (id: number | string) => void;
  results: boolean;
  votes: Record<string, number>;
  totalVotes: number;
  handleVote: any;
  loading: boolean;
  maxPercentage: number;
  quiz: boolean;
}

const PollOption: React.FC<PollOptionProps> = ({
  item,
  selectedPollOption,
  handleOption,
  handleVote,
  results,
  votes,
  totalVotes,
  loading,
  maxPercentage,
  quiz,
}) => {
  const isSelected = selectedPollOption.includes(item._id);
  const percentage = results && totalVotes > 0 ? (
    (votes[item._id] || 0) / totalVotes
  ) * 100 : 0;
  const safePercentage = isNaN(percentage) ? 0 : percentage;
  const normalizedPercentage = results
    ? (safePercentage / maxPercentage) * 100
    : safePercentage;
  const isCorrect = quiz ? item.correct : true;

  const progressColor = isSelected ? "default"
    : quiz ? (isCorrect ? "correct" : "wrong")
      : "default";

  return (
    <div key={item._id} className={`flex border-[1px] border-slate-200 ${isSelected && '!border-blue-400 border-l-8'} rounded-xl items-center min-h-[62px] max-h-[65px] h-auto space-x-2`}>
      {results ? (
        <div className="flex space-x-3 pr-3 items-start h-full w-full">
          <div className="h-full w-6 flex-1 flex flex-col">
            {/* <span
              className={`text-xs font-gellix-medium ${isSelected && "text-blue-400"
                }`}
            >
              {safePercentage.toFixed(0)}%
            </span> */}
          </div>
          <div className="w-full flex flex-col justify-center h-full gap-1 py-3">
            <div className="flex flex-row w-full justify-between">
            <p className="text-sm">{item.value}</p>
            <p className="text-paragraph-sm-regular text-muted-foreground">{votes[item._id]} vote{votes[item._id] > 1 && 's'}</p>
            </div>
            <Progress
              value={normalizedPercentage}
              color={progressColor}
              className="h-full min-h-3 w-full [&>*]:!min-h-3"
            />
          </div>
        </div>
      ) : (
        <div onClick={() => handleOption(item._id)} className="flex space-x-2 cursor-pointer items-center h-full w-full">
          <div className="h-full w-4 ml-3 flex flex-col justify-center">
            <Checkbox
              className="rounded-full !text-white"
              checked={isSelected}
              onCheckedChange={() => { handleOption(item._id); }}
              disabled={results}
            />
          </div>
          <div className="w-full">
            <div>
              <p className="text-sm">{item.value}</p>
            </div>
            {/* <div className="border-t-[2px] w-full border-slate-200 h-[6px]" /> */}
          </div>
        </div>
      )}
    </div>
  );
};

const Poll: React.FC<Props> = ({ className, pollData }) => {
  // console.log('PD:', pollData);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedPollOption, setSelectedPollOption] = useState<
    (string | number)[]
  >([]);
  const [results, setResults] = useState(false);
  const [votes, setVotes] = useState<Record<string, number>>(
    pollData.options.reduce((acc, option) => {
      acc[option._id] = option.count;
      return acc;
    }, {} as Record<string, number>)
  );
  const [totalVotes, setTotalVotes] = useState<number>(
    pollData.options.reduce((total, option) => total + option.count, 0)
  );

  const handleOption = async (id: number | string) => {
    // if (pollData.multiple) {
    //   setSelectedPollOption((prevState) =>
    //     prevState.includes(id)
    //       ? prevState.filter((optionId) => optionId !== id)
    //       : [...prevState, id]
    //   );
    // }
    if (pollData.quiz) {
      setSelectedPollOption([id]);
      const selectedOption = pollData.options.find((option) => option._id === id);
      if (!selectedOption?.correct) {
        setResults(true);
      } else {
        await submitVote([id]);
        setResults(true);
        setSuccess(true);
      }
    }
    else {
      setSelectedPollOption([id]);
      await submitVote([id]);
      setResults(true);
    }
  };

  const totalCount = (options: PollOptionType[]) => {
    return options.reduce((total, option) => total + option.count, 0);
  };

  const total = totalCount(pollData.options);
  const maxVotes = Math.max(
    ...pollData.options.map((option) => votes[option._id] || 0)
  );
  const maxPercentage = total > 0 ? (maxVotes / total) * 100 : 0;

  const submitVote = async (optionIds: (number | string)[]) => {
    try {
      setLoading(true);

      const updatedVotes = { ...votes };
      if (pollData.multiple) {
        optionIds.forEach((id) => {
          updatedVotes[id] = (updatedVotes[id] || 0) + 1;
        });
      } else {
        const id = optionIds[0];
        updatedVotes[id] = (updatedVotes[id] || 0) + 1;
      }
      setVotes(updatedVotes);

      const pollId = pollData._id;
      const request = pollData.multiple
        ? { pollId, optionIds }
        : { pollId, optionId: optionIds[0] };

      const response = await axios.post(`/api/v1/polls/vote`, request);
      // console.log('R:', response.data);
      setSuccess(true);
      setResults(true);
      setTotalVotes((prevTotal) => prevTotal + optionIds.length);
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: "This didn't work"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVote = ({ selectedOption }: any) => {
    submitVote(selectedOption ?? selectedPollOption);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <>
      <div
        className={"rounded-lg px-2 pb-1 pt-2 h-full  border-slate-100"}
      >
        {pollData.isActive ? (
          <div key={pollData._id} className="flex flex-col h-full">
            <div className="flex flex-col gap-1 mb-1">
              <p className="text-paragraph-md-bold mt-3">
                {pollData.question}
              </p>
              <p className="text-paragraph-sm-medium text-slate-400">
                {pollData.quiz ? (
                  <span className="">
                    Anonymous Quiz by{" "}
                    <span className="text-blue-400">CediRates</span>
                  </span>
                ) : (
                  <span className="">
                    Anonymous Poll by{" "}
                    <span className="text-blue-400">CediRates</span>
                  </span>
                )}
              </p>
            </div>
            <form className="h-full" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col grid-rows-none xl:grid xl:grid-rows-4 gap-3 h-full">
                {pollData.options?.slice(0,4).map((item) => (
                  <PollOption
                    key={item._id}
                    item={item}
                    handleVote={handleVote}
                    selectedPollOption={selectedPollOption}
                    handleOption={handleOption}
                    results={results}
                    votes={votes}
                    totalVotes={totalVotes}
                    loading={loading}
                    maxPercentage={maxPercentage}
                    quiz={pollData.quiz}
                  />
                ))}
                <div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <p>No Poll Found</p>
        )}
      </div>
    </>
  );
};

export default Poll;
