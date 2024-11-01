// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import './Dashboard.css';

function Dashboard() {
  const [generationData, setGenerationData] = useState([]);
  const [peakData, setPeakData] = useState([]);
  const [availabilityData, setAvailabilityData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [servicePerformance, setServicePerformance] = useState(0);

  // Función para cargar datos CSV
  const loadCSVData = async (url) => {
    const response = await fetch(url);
    const text = await response.text();
    const data = Papa.parse(text, { header: true }).data;
    return data.filter((row) => Object.values(row).some(value => value !== ''));
  };

  useEffect(() => {
    const fetchData = async () => {
      // Cargar datos de generación
      const genData = await loadCSVData('/data/System_generation_data.csv');
      setGenerationData(genData);

      // Cargar datos de pico
      const pkData = await loadCSVData('/data/System_peak_data.csv');
      setPeakData(pkData);

      // Cargar datos de disponibilidad de plantas
      const availData = await loadCSVData('/data/System_plant_availability_data.csv');
      setAvailabilityData(availData);

      // Cargar datos de ventas
      const sData = await loadCSVData('/data/System_sales_data.csv');
      setSalesData(sData);

      // Calcular rendimiento del servicio
      const latestAvailability = availData.length > 0
        ? parseFloat(availData[availData.length - 1].Value) * 100
        : 0;
      setServicePerformance(latestAvailability);

      // Obtener categorías únicas de ventas
      const salesCategoriesUnique = [...new Set(sData.map(item => item['Sub-Group'] || 'Desconocido'))];
      console.log('Categorías de ventas:', salesCategoriesUnique);

      // Obtener tipos de combustible únicos
      const fuelTypesUnique = [...new Set(genData.map(item => item.Fuel || 'Desconocido'))];
      console.log('Tipos de combustible:', fuelTypesUnique);
    };

    fetchData();
  }, []);

  // Colores para gráficos
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#8884d8', '#82ca9d'];

  // Preparar datos para visualizaciones

  // 1. Consumo Total de Energía a lo Largo del Tiempo
  const totalSalesOverTime = salesData.reduce((acc, item) => {
    const date = item.Date;
    const value = parseFloat(item.Value) || 0;
    if (!acc[date]) {
      acc[date] = { date, totalSales: 0 };
    }
    acc[date].totalSales += value;
    return acc;
  }, {});
  const totalSalesChartData = Object.values(totalSalesOverTime);

  // 2. Ventas Mensuales por Clase de Cliente
  const salesByDateAndClass = salesData.reduce((acc, item) => {
    const date = item.Date;
    const category = item['Sub-Group'] || 'Desconocido';
    const value = parseFloat(item.Value) || 0;

    if (!acc[date]) {
      acc[date] = { date };
    }
    acc[date][category] = (acc[date][category] || 0) + value;

    return acc;
  }, {});
  const salesStackedData = Object.values(salesByDateAndClass);

  // Obtener todas las categorías para el gráfico apilado
  const salesCategories = [...new Set(salesData.map(item => item['Sub-Group'] || 'Desconocido'))];

  // 3. Tendencia de Generación por Tipo de Combustible
  const generationByDateAndFuel = generationData.reduce((acc, item) => {
    const date = item.Date;
    const fuelType = item.Fuel || 'Desconocido';
    const value = parseFloat(item.Value) || 0;

    if (!acc[date]) {
      acc[date] = { date };
    }
    acc[date][fuelType] = (acc[date][fuelType] || 0) + value;

    return acc;
  }, {});
  const generationStackedData = Object.values(generationByDateAndFuel);

  // Obtener todas las categorías de combustible para el gráfico apilado
  const fuelCategories = [...new Set(generationData.map(item => item.Fuel || 'Desconocido'))];

  // 4. Comparación de Pico del Sistema y Disponibilidad de Plantas
  const peakAndAvailabilityData = peakData.map((item, index) => ({
    date: item.Date,
    peak: parseFloat(item.Value) || 0,
    availability: availabilityData[index] ? parseFloat(availabilityData[index].Value) * 100 || 0 : 0,
  }));

  // 5. Distribución Porcentual de Ventas por Clase de Cliente
  const totalSalesByClass = salesData.reduce((acc, item) => {
    const category = item['Sub-Group'] || 'Desconocido';
    const value = parseFloat(item.Value) || 0;
    acc[category] = (acc[category] || 0) + value;
    return acc;
  }, {});
  const salesPieData = Object.keys(totalSalesByClass).map((key) => ({
    name: key,
    value: totalSalesByClass[key],
  }));

  // 6. Promedio Móvil de Pico del Sistema
  const movingAverageData = peakData.map((item, index, arr) => {
    const windowSize = 3; // Tamaño de la ventana para el promedio móvil
    const start = Math.max(0, index - windowSize + 1);
    const subset = arr.slice(start, index + 1);
    const avg = subset.reduce((sum, val) => sum + parseFloat(val.Value) || 0, 0) / subset.length;
    return {
      date: item.Date,
      movingAverage: avg,
    };
  });

  // 7. Factor de Carga del Sistema
  const loadFactorData = peakData.map((item, index) => {
    const date = item.Date;
    const peak = parseFloat(item.Value) || 0;
    const totalGeneration = generationData.find(gen => gen.Date === date)
      ? parseFloat(generationData.find(gen => gen.Date === date).Value) || 0
      : 0;
    return {
      date,
      loadFactor: totalGeneration > 0 ? (peak / totalGeneration) * 100 : 0,
    };
  });

  // 8. Generación Renovable vs. No Renovable
  // Actualizar renewableFuels con los tipos de combustible reales
  const renewableFuels = ['Hydro', 'Solar', 'Wind']; // Ajustar según los tipos reales en los datos
  const renewableData = generationData.reduce((acc, item) => {
    const date = item.Date;
    const fuelType = item.Fuel || 'Desconocido';
    const value = parseFloat(item.Value) || 0;
    const type = renewableFuels.includes(fuelType) ? 'Renovable' : 'No Renovable';

    if (!acc[date]) {
      acc[date] = { date, Renovable: 0, 'No Renovable': 0 };
    }
    acc[date][type] += value;

    return acc;
  }, {});
  const renewableChartData = Object.values(renewableData);

  // 9. Consumo Promedio por Cliente
  // Actualizar clientsByClass con las categorías reales
  const clientsByClass = {
    'Residential': 1000000,
    'Commercial': 200000,
    'Industrial': 50000,
    'Public Lighting': 10000,
    'Agriculture': 5000,
    'Others': 5000,
    'Desconocido': 5000, // Opcional, si existe en tus datos
  };

  const averageConsumptionData = salesPieData.map(item => {
    const numClients = clientsByClass[item.name] || 0;
    const consumption = parseFloat(item.value) || 0;
    const avgConsumption = numClients > 0 ? (consumption / numClients) : 0;
    // Imprimir valores para verificación
    console.log(`Categoría: ${item.name}, Clientes: ${numClients}, Consumo: ${consumption}, Promedio: ${avgConsumption}`);
    return {
      category: item.name,
      averageConsumption: avgConsumption,
    };
  });

  // 10. Emisiones de CO₂ Estimadas
  // Suponiendo factores de emisión por tipo de combustible
  const emissionFactors = {
    'Coal': 2.21, // kg CO2 por kWh
    'Diesel': 2.68,
    'Natural Gas': 1.92,
    'Hydro': 0,
    'Solar': 0,
    'Wind': 0,
    'Oil': 2.52,
    'Desconocido': 2.5,
  };
  const emissionsData = generationData.map(item => ({
    date: item.Date,
    emissions: (parseFloat(item.Value) || 0) * (emissionFactors[item.Fuel] || 2.5),
  }));
  const totalEmissionsData = emissionsData.reduce((acc, item) => {
    const date = item.date;
    const emissions = item.emissions || 0;
    if (!acc[date]) {
      acc[date] = { date, emissions: 0 };
    }
    acc[date].emissions += emissions;
    return acc;
  }, {});
  const emissionsChartData = Object.values(totalEmissionsData);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Puerto Rico Power Dashboard</h1>
      </header>

      <main className="dashboard-main">
        {/* Resumen del Servicio */}
        <section className="data-section">
          <h2>Resumen del Servicio</h2>
          <div className="service-performance">
            <span className="performance-value">{servicePerformance.toFixed(2)}%</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${servicePerformance}%` }}></div>
            </div>
            <p>Disponibilidad actual del sistema</p>
          </div>
        </section>

        {/* Gráficos */}
        <section className="charts-section">
          {/* 1. Consumo Total de Energía a lo Largo del Tiempo */}
          <div className="chart-container">
            <h3>Consumo Total de Energía (GWh) a lo Largo del Tiempo</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={totalSalesChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalSales" stroke="#8884d8" name="Consumo Total (GWh)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 2. Ventas Mensuales por Clase de Cliente */}
          <div className="chart-container">
            <h3>Ventas Mensuales por Clase de Cliente</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesStackedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {salesCategories.map((key, index) => (
                  <Bar key={key} dataKey={key} stackId="a" fill={COLORS[index % COLORS.length]} name={key} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 3. Tendencia de Generación por Tipo de Combustible */}
          <div className="chart-container">
            <h3>Tendencia de Generación por Tipo de Combustible</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={generationStackedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {fuelCategories.map((key, index) => (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stackId="1"
                    stroke={COLORS[index % COLORS.length]}
                    fill={COLORS[index % COLORS.length]}
                    name={key}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 4. Comparación de Pico del Sistema y Disponibilidad de Plantas */}
          <div className="chart-container">
            <h3>Comparación de Pico del Sistema y Disponibilidad de Plantas</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={peakAndAvailabilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="peak" stroke="#8884d8" name="Pico (MW)" />
                <Line yAxisId="right" type="monotone" dataKey="availability" stroke="#82ca9d" name="Disponibilidad (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 5. Distribución Porcentual de Ventas por Clase de Cliente */}
          <div className="chart-container">
            <h3>Distribución Porcentual de Ventas por Clase de Cliente</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {salesPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 6. Promedio Móvil de Pico del Sistema */}
          <div className="chart-container">
            <h3>Promedio Móvil del Pico del Sistema</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={movingAverageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="movingAverage" stroke="#ff7300" name="Promedio Móvil (MW)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 7. Factor de Carga del Sistema */}
          <div className="chart-container">
            <h3>Factor de Carga del Sistema (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={loadFactorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="loadFactor" stroke="#8884d8" name="Factor de Carga (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 8. Generación Renovable vs. No Renovable */}
          <div className="chart-container">
            <h3>Generación Renovable vs. No Renovable</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={renewableChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Renovable" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="No Renovable" stackId="1" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 9. Consumo Promedio por Cliente */}
          <div className="chart-container">
            <h3>Consumo Promedio por Cliente (GWh)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={averageConsumptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="averageConsumption" fill="#ffc658" name="Consumo Promedio (GWh)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 10. Emisiones de CO₂ Estimadas */}
          <div className="chart-container">
            <h3>Emisiones de CO₂ Estimadas (Toneladas)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={emissionsChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="emissions" stroke="#ff7300" name="Emisiones CO₂ (Ton)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </section>
      </main>

      <footer className="dashboard-footer">
        <p>© 2023 Puerto Rico Power Dashboard. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Dashboard;
