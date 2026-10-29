import { useState } from 'react';
import raw from '../data/benchmarkSnapshot.json';
import {
  benchmark,
  benchmarkCaseUrl,
  benchmarkNumber,
  benchmarkRoundById,
  benchmarkSlug,
  benchmarkStatus,
  type BenchmarkCase,
} from '../data/benchmark';

// This evidence chunk is loaded only when a batch's result block enters the page.
const caseById = new Map((raw.cases as unknown as BenchmarkCase[]).map((item) => [item.id, item]));

function CaseDetails({ item, currentRound }: { item: BenchmarkCase; currentRound: string }) {
  const [open, setOpen] = useState(false);
  const origin = benchmarkRoundById.get(item.round);
  const isReference = item.round !== currentRound;
  return (
    <details
      className="batch-case"
      data-case-id={item.id}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary>
        <span className="batch-case-title">
          <strong>{item.title}</strong>
          <small>{item.model}</small>
        </span>
        <span className={`batch-status batch-status-${item.status}`}>
          {benchmarkStatus[item.status]}
        </span>
        <span>{isReference ? '复核引用' : '本批记录'}</span>
        <span>{item.seconds === null ? '未记录耗时' : `${benchmarkNumber(item.seconds)} 秒`}</span>
      </summary>
      {open && (
        <div className="batch-case-detail">
          <p>{item.summary}</p>
          <dl className="batch-facts">
            <div>
              <dt>记录 ID</dt>
              <dd>{item.id}</dd>
            </div>
            <div>
              <dt>执行状态</dt>
              <dd>
                {item.generated
                  ? '已有生成或交互执行标记，质量另看验收状态'
                  : '未标记为已完成生成或交互；保留原阶段'}
              </dd>
            </div>
            <div>
              <dt>输入模式</dt>
              <dd>{item.mode}</dd>
            </div>
            <div>
              <dt>计时范围</dt>
              <dd>{item.timingScope || '未记录'}</dd>
            </div>
            <div>
              <dt>成品时长</dt>
              <dd>
                {item.duration === null ? '不适用或未记录' : `${benchmarkNumber(item.duration)} 秒`}
              </dd>
            </div>
          </dl>
          {isReference && origin && (
            <p className="batch-reference">
              引用原批次：
              <a href={`#/post/${benchmarkSlug(origin.id)}`}>
                {origin.date} · {origin.title}
              </a>
              ；原执行耗时不计为本批新增。
            </p>
          )}
          {!!item.metrics.length && (
            <div
              className="article-table-wrap"
              tabIndex={0}
              aria-label={`${item.title} 指标，横向滚动`}
            >
              <table>
                <caption>实际记录的指标</caption>
                <thead>
                  <tr>
                    <th>指标</th>
                    <th>值</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  {item.metrics.map((metric, i) => (
                    <tr key={i}>
                      <th scope="row">{metric.label}</th>
                      <td>
                        {benchmarkNumber(metric.value)} {metric.unit}
                      </td>
                      <td>{metric.note || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!!item.inputs.length && (
            <details className="batch-secondary">
              <summary>输入与条件（{item.inputs.length}）</summary>
              {item.inputs.map((input, i) => (
                <div key={i}>
                  <h3>{input.label}</h3>
                  <p className="batch-preserve">{input.description}</p>
                  {input.media && (
                    <a href={input.media} target="_blank" rel="noopener noreferrer">
                      查看输入素材 ↗
                    </a>
                  )}
                </div>
              ))}
            </details>
          )}
          {item.parameters && Object.keys(item.parameters).length > 0 && (
            <details className="batch-secondary">
              <summary>生成参数与运行配置</summary>
              <pre>{JSON.stringify(item.parameters, null, 2)}</pre>
            </details>
          )}
          {!!item.verification?.length && (
            <details className="batch-secondary">
              <summary>独立核验</summary>
              {item.verification.map((check, i) => (
                <p key={i}>
                  <strong>{check.label}</strong>：{check.result}
                </p>
              ))}
            </details>
          )}
          {item.textResult && (
            <details className="batch-secondary">
              <summary>原始文本结果</summary>
              <pre>{item.textResult}</pre>
            </details>
          )}
          {!!item.limitations.length && (
            <>
              <h3>结果边界</h3>
              <ul>
                {item.limitations.map((limit, i) => (
                  <li key={i}>{limit}</li>
                ))}
              </ul>
            </>
          )}
          {!!item.media.length && (
            <>
              <h3>素材引用（{item.media.length}）</h3>
              <ul className="batch-asset-list">
                {item.media.map((media, i) => (
                  <li key={i}>
                    <a href={media.url} target="_blank" rel="noopener noreferrer">
                      {media.label}
                      {media.url.endsWith('.flac') ? ' · FLAC 无损发布版' : ''} ↗
                    </a>
                    <small>{media.type}</small>
                  </li>
                ))}
              </ul>
            </>
          )}
          {!!item.links.length && (
            <details className="batch-secondary">
              <summary>工作流、数据与补充证据（{item.links.length}）</summary>
              <ul>
                {item.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}
          <p>
            <a
              className="batch-original"
              href={benchmarkCaseUrl(item.id)}
              target="_blank"
              rel="noopener noreferrer"
            >
              查看完整测评与原始资料 ↗
            </a>
          </p>
        </div>
      )}
    </details>
  );
}

export default function BenchmarkResults({ roundId }: { roundId: string }) {
  const round = benchmark.rounds.find((item) => item.id === roundId);
  if (!round) return <p>未找到该测评批次。</p>;
  return (
    <section className="batch-results" aria-label="本批全部测评记录" data-round-id={roundId}>
      <div className="batch-result-heading">
        <span>条目 / 模型</span>
        <span>快照状态</span>
        <span>关联类型</span>
        <span>执行耗时</span>
      </div>
      {round.caseIds.map((id) => (
        <CaseDetails key={id} item={caseById.get(id)!} currentRound={roundId} />
      ))}
    </section>
  );
}
