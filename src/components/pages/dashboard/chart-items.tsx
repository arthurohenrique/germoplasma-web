"use client";

import React, { useMemo } from "react";
import { Pie, PieChart, Label, Cell } from "recharts";
import { useFetchData } from "@/service/useFetchData";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Listas de resistentes e não resistentes à ferrugem
const NAO_RESISTENTES = [
  "Típica",
  "Nacional",
  "Típica UFV 536",
  "Típica da Guatemala",
  "Bourbon Vermelho",
  "Bourbon Amarelo",
  "Bourbon Alaranjado",
  "Maragogipe",
  "Mundo Novo",
  "Catuaí Vermelho",
  "Catuaí Amarelo",
  "Caturra Vermelho",
  "Caturra Amarelo",
  "Laurina",
];

const RESISTENTES = [
  "Híbrido Timor",
  "Catimor",
  "Sarchimor",
  "IAPAR 59",
  "IPR 98",
  "IPR 99",
  "IPR 100",
  "Obatã Amarelo",
  "Obatã IAC 1669-20",
  "Icatu Amarelo IAC 3282",
  "Icatu Vermelho IAC 4045",
  "Ouro Verde IAC 4395",
  "Siriema 842-2-4",
];

export function Component() {
  const { data, loading, error } = useFetchData(
    "https://www.epamig.tech/germoplasma/germoplasma_cafe.php"
  );

  // Dados estáticos para municípios
  const municipiosData = [
    { name: "Campinas-SP", value: 1 },
    { name: "Viçosa-MG", value: 1 },
    { name: "Patrocínio-MG", value: 1 },
    { name: "Ervália-MG", value: 1 },
    { name: "São Sebastião do Paraíso-MG", value: 1 },
    { name: "Martins Soares-MG", value: 1 },
    { name: "Dois Córregos-SP", value: 1 },
    { name: "Campos Altos-MG", value: 1 },
    { name: "Monte Santo de Minas-MG", value: 1 },
    { name: "São Sebastião da Grama-SP", value: 1 },
    { name: "Araponga-MG", value: 1 },
    { name: "Marechal Floriano-ES", value: 1 },
    { name: "Guaxupé-MG", value: 1 },
    { name: "Guaranésia-SP", value: 1 },
    { name: "Alfenas-MG", value: 1 },
    { name: "Manhumirim-MG", value: 1 },
    { name: "Machado-MG", value: 1 },
    { name: "Varginha-MG", value: 1 },
    { name: "Santo Antônio do Amparo-MG", value: 1 },
    { name: "Iuna-ES", value: 1 },
    { name: "Carmo de Minas-MG", value: 1 },
    { name: "Cambira-PR", value: 1 },
    { name: "Apucarana-PR", value: 1 },
  ];

  // Processar dados para o segundo gráfico (Resistentes x Não Resistentes)
  const ferrugemData = useMemo(() => {
    if (!data.length) return [];
    const resistentes = data.filter((item) =>
      RESISTENTES.some((resistente) =>
        item.designacao_material
          .toLowerCase()
          .includes(resistente.toLowerCase())
      )
    ).length;

    const naoResistentes = data.filter((item) =>
      NAO_RESISTENTES.some((naoResistente) =>
        item.designacao_material
          .toLowerCase()
          .includes(naoResistente.toLowerCase())
      )
    ).length;

    return [
      { name: "Resistentes", value: resistentes },
      { name: "Não Resistentes", value: naoResistentes },
    ];
  }, [data]);

  if (loading) return <div>Carregando Gráficos...</div>;
  if (error) return <div>Erro ao carregar dados: {error}</div>;

  return (
    <div className="flex flex-row gap-4 m-1">
      {/* Gráfico 1 */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Municípios</CardTitle>
          <CardDescription>Gráfico 1</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={{}}
            className="mx-auto aspect-square max-h-[250px] w-[250px] h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={municipiosData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
                isAnimationActive={false}
              >
                {municipiosData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`hsl(var(--chart-${(index % 5) + 1}))`}
                  />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {municipiosData.length}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Municípios
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico 2 */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Resistentes à Ferrugem</CardTitle>
          <CardDescription>Gráfico 2</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={{}}
            className="mx-auto aspect-square max-h-[250px] w-[250px] h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={ferrugemData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
                isAnimationActive={false}
              >
                {ferrugemData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`hsl(var(--chart-${index + 1}))`}
                  />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {ferrugemData.reduce(
                              (acc, curr) => acc + curr.value,
                              0
                            )}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Itens
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
