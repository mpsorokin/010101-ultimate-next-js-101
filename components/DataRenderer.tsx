import { DEFAULT_EMPTY } from "@/constants/states";

interface IDataRendererProps<T> {
  success: boolean;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  data?: T[] | null | undefined;
  empty?: {
    title: string;
    message: string;
    button?: {
      text: string;
      href: string;
    };
  };
  render?: (data: T[]) => React.ReactNode;
}

const DataRenderer = <T,>({
  success,
  error,
  data,
  empty = DEFAULT_EMPTY,
  render,
}: IDataRendererProps<T>) => {
  return <p>DR</p>;
};

export default DataRenderer;
