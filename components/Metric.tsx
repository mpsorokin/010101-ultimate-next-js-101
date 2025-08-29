import Image from "next/image";
import Link from "next/link";
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
  const metricContent = (
    <>
      <Image src={imgUrl} alt={alt} width={16} height={16} />
    </>
  );
  return href ? (
    <Link href={href}>{metricContent}</Link>
  ) : (
    <div>{metricContent}</div>
  );
};
export default Metric;
