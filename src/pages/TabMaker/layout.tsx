interface Props {
  children: React.ReactNode;
}

const TabMakerLayout = (props: Props) => {
  const { children } = props;

  return <div className="h-[100svh] w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">{children}</div>;
};

export default TabMakerLayout;
