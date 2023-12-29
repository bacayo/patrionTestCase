"use client";

import { getCoordinates, getWeather } from "@/actions/getCoordinates";
import CountryMap from "@/components/CountryMap";
import Loading from "@/components/Loading";
import { ToggleTheme } from "@/components/ToggleTheme";
import Weather from "@/components/Weather";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GeoLocation } from "@/types";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  // const [myError, setMyError] = useState("");

  const [geoLocation, setGeoLocation] = useState<GeoLocation | null>(null);

  // if user selects a city get geolocation of the city in order to get weather information.
  const handleClick = async (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
    const selectedCity = e.currentTarget.attributes.getNamedItem("data-iladi")
      ?.value as string;
    setCity(selectedCity);
    setIsOpen(true);

    const data = await queryClient.fetchQuery({
      queryKey: ["coords", selectedCity],
      queryFn: () =>
        getCoordinates(
          selectedCity as string,
          process.env.NEXT_PUBLIC_API_KEY as string,
        ),
    });
    setGeoLocation(data as GeoLocation);
  };

  // get weather information, need latitude and longtitude and api key.
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["city", geoLocation],
    queryFn: () =>
      getWeather(
        geoLocation?.lat as number,
        geoLocation?.lon as number,
        process.env.NEXT_PUBLIC_API_KEY as string,
      ),
    enabled: !!geoLocation,
  });

  const handleDialogClose = () => {
    setCity(null);
    setGeoLocation(null);
    // set data to undefined
    queryClient.setQueryData(["city"], undefined);
  };

  return (
    <main className="h-screen">
      {/* Navbar, change theme */}
      <nav className="flex justify-end  px-4 py-2">
        <ToggleTheme />
      </nav>
      <div className=" flex h-4/5 items-center justify-center">
        <CountryMap onClick={handleClick} />
        {/* When user click on city open modal */}
        <Dialog
          open={isOpen}
          onOpenChange={() => {
            setIsOpen(!isOpen);
          }}
        >
          <DialogTrigger />
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {error ? "Something went wrong" : data?.name}
              </DialogTitle>
              {error && <DialogDescription>{error.message}</DialogDescription>}
            </DialogHeader>
            <div className="flex h-[410px]">
              {isFetching ? (
                <div className="flex h-full w-full items-center  justify-center">
                  <Loading />
                </div>
              ) : data ? (
                <Weather data={data} />
              ) : null}
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  onClick={handleDialogClose}
                  type="button"
                  variant="secondary"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
