import React, { useMemo } from 'react';
import { useApp } from '../utils/AppContext';
import { fitLangmuir, fitFreundlich, bestFitIsotherm } from '../calculations/isotherms';
import {
  ScatterChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { LineChart, Award, AlertCircle, TrendingUp, ArrowLeft, ArrowRight } from 'lucide-react';

const LANGMUIR_COLOR = '#29483A';
const FREUNDLICH_COLOR = '#C89B5B';
const DATA_COLOR = '#6F8F72';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card-bg backdrop-blur-sm border border-accent-gold/30 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-dark-brown text-xs font-medium mb-1">{`Cₑ = ${label?.toFixed?.(3) ?? label}`}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {Number(entry.value).toFixed(4)}
        </p>
      ))}
    </div>
  );
}

function ModelCard({ title, icon: Icon, formula, params, r2, scatterData, xKey, yKey, curveKey, xLabel, yLabel, curveData }) {
  const hasData = scatterData && scatterData.length > 0;
  const hasCurve = curveData && curveData.length > 0;

  return (
    <div className="bg-card-bg backdrop-blur-sm rounded-2xl border border-accent-gold/20 p-5 shadow-sm animate-fade-in flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-deep-green/10 flex items-center justify-center">
          <Icon size={18} className="text-deep-green" />
        </div>
        <h3 className="text-lg font-semibold text-dark-brown">{title}</h3>
      </div>

      <div className="bg-warm-white rounded-lg px-3 py-2 mb-4 border border-beige">
        <p className="text-xs text-muted-green font-mono leading-relaxed">{formula}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {params.map((p) => (
          <div key={p.label} className="bg-warm-white rounded-lg px-3 py-2 text-center border border-beige">
            <p className="text-xs text-muted-green mb-0.5">{p.label}</p>
            <p className="text-sm font-semibold text-dark-brown">{p.value}</p>
          </div>
        ))}
        <div className="bg-warm-white rounded-lg px-3 py-2 text-center border border-accent-gold/30">
          <p className="text-xs text-muted-green mb-0.5">R²</p>
          <p className={`text-sm font-bold ${r2 >= 0.9 ? 'text-deep-green' : r2 >= 0.7 ? 'text-accent-gold' : 'text-red-600'}`}>
            {r2}
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-[220px]">
        {hasData ? (
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top: 5, right: 10, bottom: 25, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc8" />
              <XAxis
                type="number"
                dataKey={xKey}
                name={xLabel}
                tick={{ fontSize: 11, fill: '#3B2A20' }}
                label={{ value: xLabel, position: 'bottom', offset: 10, fontSize: 12, fill: '#6F8F72' }}
              />
              <YAxis
                type="number"
                dataKey={yKey}
                name={yLabel}
                tick={{ fontSize: 11, fill: '#3B2A20' }}
                label={{ value: yLabel, angle: -90, position: 'insideLeft', offset: 0, fontSize: 12, fill: '#6F8F72' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter name="Data" data={scatterData} fill={DATA_COLOR} fillOpacity={0.8} />
              {hasCurve && (
                <Scatter
                  name="Fitted"
                  data={curveData}
                  line={{ stroke: curveKey === 'langmuir' ? LANGMUIR_COLOR : FREUNDLICH_COLOR, strokeWidth: 2 }}
                  shape={() => null}
                  legendType="line"
                />
              )}
            </ScatterChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[220px] flex items-center justify-center text-muted-green/60 text-sm">
            No data available
          </div>
        )}
      </div>
    </div>
  );
}

export default function IsothermModelling() {
  const { processedExperiments, setPage } = useApp();

  const validData = useMemo(
    () => (processedExperiments || []).filter((d) => d.Ce > 0 && d.qe > 0),
    [processedExperiments]
  );

  const langmuir = useMemo(() => fitLangmuir(validData), [validData]);
  const freundlich = useMemo(() => fitFreundlich(validData), [validData]);
  const bestFit = useMemo(() => bestFitIsotherm(langmuir, freundlich), [langmuir, freundlich]);

  if (validData.length < 2) {
    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <LineChart size={22} className="text-deep-green" />
            <h1 className="text-2xl font-bold text-dark-brown">Isotherm Modelling</h1>
          </div>
          <p className="text-muted-green text-sm">Fit Langmuir and Freundlich isotherm models to equilibrium data</p>
        </div>

        <div className="bg-card-bg backdrop-blur-sm rounded-2xl border border-accent-gold/20 p-10 shadow-sm flex flex-col items-center justify-center text-center max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-accent-gold/10 flex items-center justify-center mb-4">
            <AlertCircle size={28} className="text-accent-gold" />
          </div>
          <h2 className="text-lg font-semibold text-dark-brown mb-2">Insufficient Data</h2>
          <p className="text-sm text-muted-green leading-relaxed">
            At least <span className="font-semibold text-dark-brown">2 valid data points</span> with
            Cₑ &gt; 0 and qₑ &gt; 0 are required to fit isotherm models. Please add more experiments with equilibrium data.
          </p>
        </div>
      </div>
    );
  }

  const langmuirScatter = langmuir?.points?.map((p) => ({ Ce: p.Ce, Ce_qe: p.yCalc })) || [];
  const langmuirCurve = langmuir?.curvePoints?.map((p) => ({ Ce: p.Ce, Ce_qe: (langmuir.qmax * langmuir.Kl * p.Ce) / (1 + langmuir.Kl * p.Ce) })) || [];

  const freundlichScatter = freundlich?.points?.map((p) => ({ lnCe: p.lnCe, lnqe: p.lnqe })) || [];
  const freundlichCurve = freundlich?.curvePoints?.map((p) => ({ lnCe: Math.log(Math.max(p.Ce, 0.001)), lnqe: Math.log(Math.max(p.qe, 0.001)) })) || [];

  const overlayData = validData.map((d) => ({ Ce: d.Ce, qe: d.qe }));

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <LineChart size={22} className="text-deep-green" />
          <h1 className="text-2xl font-bold text-dark-brown">Isotherm Modelling</h1>
        </div>
        <p className="text-muted-green text-sm">Fit Langmuir and Freundlich isotherm models to equilibrium data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {langmuir && (
          <ModelCard
            title="Langmuir"
            icon={TrendingUp}
            formula="Cₑ/qₑ = 1/(qₘₐₓ · Kₗ) + Cₑ/qₘₐₓ"
            params={[
              { label: 'qₘₐₓ (mg/g)', value: langmuir.qmax },
              { label: 'Kₗ (L/mg)', value: langmuir.Kl },
            ]}
            r2={langmuir.r2}
            scatterData={langmuirScatter}
            curveData={langmuirCurve}
            xKey="Ce"
            yKey="Ce_qe"
            curveKey="langmuir"
            xLabel="Cₑ (mg/L)"
            yLabel="Cₑ/qₑ"
          />
        )}

        {freundlich && (
          <ModelCard
            title="Freundlich"
            icon={TrendingUp}
            formula="qₑ = K_f · Cₑ^(1/n)"
            params={[
              { label: 'K_f (mg/g)', value: freundlich.Kf },
              { label: 'n', value: freundlich.n },
            ]}
            r2={freundlich.r2}
            scatterData={freundlichScatter}
            curveData={freundlichCurve}
            xKey="lnCe"
            yKey="lnqe"
            curveKey="freundlich"
            xLabel="ln(Cₑ)"
            yLabel="ln(qₑ)"
          />
        )}
      </div>

      {bestFit && (
        <div className="bg-card-bg backdrop-blur-sm rounded-2xl border border-accent-gold/20 p-5 shadow-sm mb-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent-gold/15 flex items-center justify-center">
              <Award size={18} className="text-accent-gold" />
            </div>
            <h3 className="text-lg font-semibold text-dark-brown">Model Comparison</h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 grid grid-cols-2 gap-3 w-full">
              <div
                className={`rounded-xl px-4 py-3 text-center border-2 transition-all ${
                  bestFit === 'langmuir'
                    ? 'border-deep-green bg-deep-green/5'
                    : 'border-beige bg-warm-white'
                }`}
              >
                <p className="text-xs text-muted-green mb-1">Langmuir R²</p>
                <p className="text-xl font-bold text-dark-brown">{langmuir?.r2 ?? '—'}</p>
              </div>
              <div
                className={`rounded-xl px-4 py-3 text-center border-2 transition-all ${
                  bestFit === 'freundlich'
                    ? 'border-deep-green bg-deep-green/5'
                    : 'border-beige bg-warm-white'
                }`}
              >
                <p className="text-xs text-muted-green mb-1">Freundlich R²</p>
                <p className="text-xl font-bold text-dark-brown">{freundlich?.r2 ?? '—'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-deep-green/8 rounded-xl px-5 py-3 border border-deep-green/20">
              <Award size={20} className="text-deep-green" />
              <div>
                <p className="text-xs text-muted-green">Best-Fit Model</p>
                <p className="text-base font-bold text-deep-green capitalize">{bestFit}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {validData.length >= 2 && (
        <div className="bg-card-bg backdrop-blur-sm rounded-2xl border border-accent-gold/20 p-5 shadow-sm animate-fade-in">
          <h3 className="text-lg font-semibold text-dark-brown mb-4">Combined Isotherm Curves</h3>
          <ResponsiveContainer width="100%" height={320}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 30, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc8" />
              <XAxis
                type="number"
                dataKey="Ce"
                name="Cₑ"
                tick={{ fontSize: 11, fill: '#3B2A20' }}
                label={{ value: 'Cₑ (mg/L)', position: 'bottom', offset: 10, fontSize: 12, fill: '#6F8F72' }}
              />
              <YAxis
                type="number"
                dataKey="qe"
                name="qₑ"
                tick={{ fontSize: 11, fill: '#3B2A20' }}
                label={{ value: 'qₑ (mg/g)', angle: -90, position: 'insideLeft', offset: 0, fontSize: 12, fill: '#6F8F72' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={30} />

              <Scatter name="Experimental" data={overlayData} fill={DATA_COLOR} fillOpacity={0.85} legendType="circle" />

              {langmuir && (
                <Scatter
                  name={`Langmuir (R²=${langmuir.r2})`}
                  data={langmuir.curvePoints}
                  line={{ stroke: LANGMUIR_COLOR, strokeWidth: 2.5 }}
                  shape={() => null}
                  legendType="line"
                />
              )}

              {freundlich && (
                <Scatter
                  name={`Freundlich (R²=${freundlich.r2})`}
                  data={freundlich.curvePoints}
                  line={{ stroke: FREUNDLICH_COLOR, strokeWidth: 2.5, strokeDasharray: '6 3' }}
                  shape={() => null}
                  legendType="line"
                />
              )}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 pb-8">
        <button
          onClick={() => setPage('analysis')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-beige text-dark-brown text-sm font-medium hover:bg-beige/50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Analysis
        </button>
        <button
          onClick={() => setPage('optimization')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-deep-green text-cream text-sm font-medium shadow-sm hover:bg-deep-green/90 transition-colors"
        >
          Next: AI Optimization <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
