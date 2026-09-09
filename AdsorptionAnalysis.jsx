import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Cell,
} from 'recharts';
import { BarChart3, TrendingUp, Activity, Target, ArrowLeft, ArrowRight } from 'lucide-react';
import { useApp } from '../utils/AppContext';

const COLORS = {
  deepGreen: '#29483A',
  accentGold: '#C89B5B',
  mutedGreen: '#6F8F72',
  darkBrown: '#3B2A20',
};

const PALETTE = [COLORS.deepGreen, COLORS.accentGold, COLORS.mutedGreen, COLORS.darkBrown];

function getBarColor(index) {
  return PALETTE[index % PALETTE.length];
}

function SectionHeader({ icon: Icon, title }) {
  return (
    <h2 className="text-xl font-bold text-dark-brown flex items-center gap-2 mb-4">
      <Icon className="w-5 h-5 text-accent-gold" />
      {title}
    </h2>
  );
}

function ChartCard({ children, className = '' }) {
  return (
    <div className={`bg-cream rounded-2xl shadow-sm border border-deep-green/10 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}

function StatPill({ label, value, unit, color = 'deep-green' }) {
  return (
    <div className={`bg-${color}/10 border border-${color}/20 rounded-xl px-4 py-2 text-center`}>
      <p className="text-xs text-muted-green font-medium uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-extrabold text-${color}`}>
        {value}
        {unit && <span className="text-sm font-semibold ml-1">{unit}</span>}
      </p>
    </div>
  );
}

function ScatterPlot({ data, xKey, yKey, xLabel, yLabel, color }) {
  if (!data || data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <ScatterChart margin={{ top: 10, right: 10, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
        <XAxis
          dataKey={xKey}
          name={xLabel}
          type="number"
          tick={{ fontSize: 12, fill: '#3B2A20' }}
          axisLine={{ stroke: '#6F8F72' }}
          label={{ value: xLabel, position: 'bottom', offset: -2, fontSize: 11, fill: '#6F8F72' }}
        />
        <YAxis
          dataKey={yKey}
          name={yLabel}
          type="number"
          tick={{ fontSize: 12, fill: '#3B2A20' }}
          axisLine={{ stroke: '#6F8F72' }}
          label={{ value: yLabel, angle: -90, position: 'insideLeft', offset: 10, fontSize: 11, fill: '#6F8F72' }}
        />
        <Tooltip
          contentStyle={{ borderRadius: '12px', border: '1px solid #6F8F7230', fontSize: 13 }}
        />
        <Scatter data={data} fill={color}>
          {data.map((_, i) => (
            <Cell key={i} fill={color} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}

function RemovalChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: '#3B2A20' }}
          axisLine={{ stroke: '#6F8F72' }}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#3B2A20' }}
          axisLine={{ stroke: '#6F8F72' }}
          label={{ value: 'Removal %', angle: -90, position: 'insideLeft', offset: 10, fontSize: 11, fill: '#6F8F72' }}
        />
        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #6F8F7230', fontSize: 13 }} />
        <Legend />
        <Bar dataKey="removal" name="Removal %" radius={[6, 6, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={getBarColor(i)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function QeChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e0d8" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: '#3B2A20' }}
          axisLine={{ stroke: '#6F8F72' }}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#3B2A20' }}
          axisLine={{ stroke: '#6F8F72' }}
          label={{ value: 'qₑ (mg/g)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 11, fill: '#6F8F72' }}
        />
        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #6F8F7230', fontSize: 13 }} />
        <Legend />
        <Bar dataKey="qe" name="qₑ (mg/g)" radius={[6, 6, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={getBarColor(i)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function AdsorptionAnalysis() {
  const { processedExperiments, setPage } = useApp();
  const hasData = processedExperiments && processedExperiments.length > 0;

  if (!hasData) {
    return (
      <div className="min-h-screen bg-beige animate-fade-in">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-extrabold text-dark-brown mb-2">Adsorption Analysis</h1>
          <p className="text-muted-green mb-8">Detailed charts and parameter relationships from your experiments.</p>
          <div className="bg-cream rounded-2xl shadow-sm border border-deep-green/10 p-12">
            <BarChart3 className="w-16 h-16 text-muted-green/40 mx-auto mb-4" />
            <p className="text-lg font-semibold text-dark-brown mb-1">No Processed Experiments</p>
            <p className="text-sm text-muted-green">
              Run some experiments first and the analysis charts will appear here automatically.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const avgRemoval = (
    processedExperiments.reduce((sum, e) => sum + (e.removal ?? 0), 0) / processedExperiments.length
  ).toFixed(1);

  const avgQe = (
    processedExperiments.reduce((sum, e) => sum + (e.qe ?? 0), 0) / processedExperiments.length
  ).toFixed(2);

  const barData = processedExperiments.map((e, i) => ({
    label: e.label || `Exp ${i + 1}`,
    removal: e.removal,
    qe: e.qe,
  }));

  const removalVsPH = processedExperiments
    .filter(e => e.pH != null && e.removal != null)
    .map(e => ({ pH: e.pH, removal: e.removal }));

  const removalVsTime = processedExperiments
    .filter(e => e.contactTime != null && e.removal != null)
    .map(e => ({ contactTime: e.contactTime, removal: e.removal }));

  const removalVsDose = processedExperiments
    .filter(e => e.adsorbentDose != null && e.removal != null)
    .map(e => ({ adsorbentDose: e.adsorbentDose, removal: e.removal }));

  const qeVsConc = processedExperiments
    .filter(e => e.C0 != null && e.qe != null)
    .map(e => ({ C0: e.C0, qe: e.qe }));

  return (
    <div className="min-h-screen bg-beige animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* Header */}
        <header className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-deep-green/10 border border-deep-green/20 rounded-full px-4 py-1.5 mb-2">
            <Activity className="w-4 h-4 text-deep-green" />
            <span className="text-xs font-semibold text-deep-green uppercase tracking-wider">
              Data Visualization
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-dark-brown tracking-tight">
            Adsorption Analysis
          </h1>
          <p className="text-lg text-muted-green max-w-xl mx-auto">
            Experimental results, pollutant removal trends, and parameter relationships.
          </p>
        </header>

        {/* Pollutant Removal Section */}
        <section>
          <ChartCard>
            <SectionHeader icon={BarChart3} title="Pollutant Removal Efficiency" />
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="flex-shrink-0 text-center">
                <div className="w-32 h-32 rounded-full bg-deep-green/10 border-4 border-deep-green/30 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-deep-green">{avgRemoval}</span>
                  <span className="text-xs font-semibold text-deep-green/70">% avg</span>
                </div>
              </div>
              <div className="flex-1 w-full">
                <RemovalChart data={barData} />
              </div>
            </div>
          </ChartCard>
        </section>

        {/* Adsorption Capacity Section */}
        <section>
          <ChartCard>
            <SectionHeader icon={Target} title="Adsorption Capacity (qₑ)" />
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="flex-shrink-0 text-center">
                <div className="w-32 h-32 rounded-full bg-accent-gold/10 border-4 border-accent-gold/30 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-accent-gold">{avgQe}</span>
                  <span className="text-xs font-semibold text-accent-gold/70">mg/g avg</span>
                </div>
              </div>
              <div className="flex-1 w-full">
                <QeChart data={barData} />
              </div>
            </div>
          </ChartCard>
        </section>

        {/* Parameter Relationship Charts */}
        <section>
          <h2 className="text-xl font-bold text-dark-brown flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-accent-gold" />
            Parameter Relationships
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartCard>
              <p className="text-sm font-semibold text-dark-brown mb-3">Removal % vs pH</p>
              <ScatterPlot
                data={removalVsPH}
                xKey="pH"
                yKey="removal"
                xLabel="pH"
                yLabel="Removal %"
                color={COLORS.deepGreen}
              />
            </ChartCard>

            <ChartCard>
              <p className="text-sm font-semibold text-dark-brown mb-3">Removal % vs Contact Time</p>
              <ScatterPlot
                data={removalVsTime}
                xKey="contactTime"
                yKey="removal"
                xLabel="Contact Time (min)"
                yLabel="Removal %"
                color={COLORS.accentGold}
              />
            </ChartCard>

            <ChartCard>
              <p className="text-sm font-semibold text-dark-brown mb-3">Removal % vs Adsorbent Dose</p>
              <ScatterPlot
                data={removalVsDose}
                xKey="adsorbentDose"
                yKey="removal"
                xLabel="Adsorbent Dose (g/L)"
                yLabel="Removal %"
                color={COLORS.mutedGreen}
              />
            </ChartCard>

            <ChartCard>
              <p className="text-sm font-semibold text-dark-brown mb-3">qₑ vs Initial Concentration</p>
              <ScatterPlot
                data={qeVsConc}
                xKey="C0"
                yKey="qe"
                xLabel="C₀ (mg/L)"
                yLabel="qₑ (mg/g)"
                color={COLORS.darkBrown}
              />
            </ChartCard>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2 pb-8">
          <button
            onClick={() => setPage('experiment')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-beige text-dark-brown text-sm font-medium hover:bg-beige/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Experiment
          </button>
          <button
            onClick={() => setPage('isotherm')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-deep-green text-cream text-sm font-medium shadow-sm hover:bg-deep-green/90 transition-colors"
          >
            Next: Isotherm Modelling <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
