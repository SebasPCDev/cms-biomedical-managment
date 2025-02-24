"use client";
import { Box, CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function HojasDeVida() {
  const { id } = useParams<{ id: string }>();

  return (
    <Box className="p-4">
      <h1 className="text-3xl font-bold">Editar Hoja de vida {id}</h1>
    </Box>
  );
}
