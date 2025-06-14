type ResultsCountProps = {
  totalNumberofResults: number;
};
export default function ResultsCount({
  totalNumberofResults,
}: ResultsCountProps) {
  return (
    <p className="count">
      <span className="u-bold">{totalNumberofResults}</span> results
    </p>
  );
}
