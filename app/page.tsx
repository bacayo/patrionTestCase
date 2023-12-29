"use client";

import { getCoordinates, getWeather } from "@/actions/getCoordinates";
import CountryMap from "@/components/CountryMap";
import Loading from "@/components/Loading";
import { ToggleTheme } from "@/components/ToggleTheme";
import Weather from "@/components/Weather";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GeoLocation } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

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
  const { data, error, isLoading } = useQuery({
    queryKey: ["city", geoLocation],
    queryFn: () =>
      getWeather(
        geoLocation?.lat as number,
        geoLocation?.lon as number,
        process.env.NEXT_PUBLIC_API_KEY as string,
      ),
  });

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
          <DialogContent>
            {/* if error display error message */}
            {error ? (
              <DialogTitle className="flex flex-col gap-2">
                <p>Bir hata oluştu</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  hata: {error.message}
                </p>
              </DialogTitle>
            ) : (
              <DialogHeader>
                <DialogTitle>{data?.name}</DialogTitle>
                <DialogDescription className="h-[210px] font-semibold text-primary">
                  {isLoading ? (
                    <div className="flex h-full items-center justify-center">
                      <Loading />
                    </div>
                  ) : (
                    <Weather data={data} />
                  )}
                </DialogDescription>
              </DialogHeader>
            )}
          </DialogContent>
          <DialogClose
            onClick={() => {
              setCity(null);
              setGeoLocation(null);
            }}
          />
        </Dialog>
      </div>
    </main>
  );
}
