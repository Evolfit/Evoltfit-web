import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import supabase from "/config/supabaseClient";
import RowSetsComenzar from "/components/RowSetsComenzar";

const Cronometro = ({ pausaTiempo, setTiempo, tiempo }) => {

    useEffect(() => {
        let interval;
        if (!pausaTiempo) {
            interval = setInterval(() => {
            setTiempo((prevTime) => prevTime + 1000);
            }, 1000);
        } else if (!pausaTiempo) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [pausaTiempo]);

    return (
    <div className="stopwatch">
        <div className="numbers text-2xl">
        <span>{("0" + Math.floor((tiempo / 3600000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((tiempo / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((tiempo / 1000) % 60)).slice(-2)}</span>
        </div>
        {/*
        <div className="buttons">
        <button onClick={() => setPausaTiempo(true)}>Start</button>
        <button onClick={() => setPausaTiempo(false)}>Stop</button>
        <button onClick={() => setTiempo(0)}>Reset</button>       
        </div>
        */}
    </div>
    );
};

export default Cronometro;
