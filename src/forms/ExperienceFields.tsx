import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { CiCalendar } from "react-icons/ci";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { MdDeleteOutline } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import SelfAttestButton from "@/components/Buttons/SelfAttest";
import UploadProofButton from "@/components/Buttons/UploadProofButton";
import IssuerButton from "@/components/Buttons/IssuerButton";
type Props = {
  fields: Record<"id", string>[];
  index: number;
  removeExperienceFields: (index: number) => void;
};

const ExperienceFields = ({ index, removeExperienceFields, fields }: Props) => {
  const { control, setValue } = useFormContext();
  const [date, setDate] = useState<DateRange | undefined>();
  // {
  //   from: new Date(2023, 0, 20),
  //   to: addDays(new Date(2024, 0, 20), 20),
  // }

  const { remove } = useFieldArray({ control, name: "Experience" });

  useEffect(() => {
    if (date?.from && date?.to) {
      setValue(`Experience.${index}.duration`, {
        from: date.from,
        to: date.to,
      });
    }
  }, [date, setValue, index]);

  const deleteHandler = () => {
    remove(index);
    removeExperienceFields(index);
  };

  return (
    <>
      <div className="flex flex-col xl:flex-row gap-2 xl:gap-5 xl:items-center">
        <FormField
          name={`Experience.${index}.company_name`}
          control={control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Company name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter company name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`Experience.${index}.job_role`}
          control={control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Job role / title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter job role/title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* duration */}
        <FormField
          name={`Experience.${index}.duration`}
          control={control}
          render={() => (
            <FormItem className="flex flex-1 gap-1 flex-col justify-center">
              <FormLabel className="">Duration</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CiCalendar className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {/* work description */}
      <div className="flex flex-col xl:flex-row xl:items-center gap-1 xl:gap-5">
        <FormField
          name={`Experience.${index}.description`}
          control={control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Work description</FormLabel>
              <FormDescription className="text-sm">
                You can share your work experience, including your previous
                roles, key responsibilities
              </FormDescription>
              <FormControl>
                <Textarea {...field} placeholder="Enter description..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {fields.length > 1 && index + 1 === fields.length && (
          <Button
            type="button"
            variant={"destructive"}
            className="mt-5 text-sm px-10"
            onClick={deleteHandler}
          >
            Remove
            <MdDeleteOutline className="text-xl ml-2" />
          </Button>
        )}
      </div>
      <div className="flex flex-col xl:flex-row xl:gap-5 gap-3 py-3">
        <SelfAttestButton className="mt-0" />
        <UploadProofButton className="mt-0" />
        <IssuerButton className="mt-0 text-xs sm:text-sm" />
      </div>
      {fields.length > 1 && <Separator />}
    </>
  );
};

export default ExperienceFields;
