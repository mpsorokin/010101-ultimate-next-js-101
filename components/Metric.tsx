interface IMetricProps {
  imgUrl: string;
  alt: string;
  value: string;
  title: string;
  href: string;
  textStyles: string;
  imgStyles: string;
  isAuthor: boolean;
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  imgStyles,
  isAuthor,
}: IMetricProps) => {
  return <p>M</p>;
};
export default Metric;
