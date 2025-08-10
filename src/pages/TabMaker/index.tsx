import ResizableSplit from "@components/ResizableSplit/ResizableSplit";
import { withLayout } from "@utils/withLayout";
import TabMakerLayout from "./layout";
import Editor from "./sections/Editor";
import Header from "./sections/Header";
import Preview from "./sections/Preview";
import Sidebar from "./sections/Sidebar";

const TabMakerPage = () => {
  return (
    <div className="flex h-full">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        {/* Resizable Editor + Preview */}
        <ResizableSplit initial={65} offset={80} left={<Editor />} right={<Preview />} />
      </div>
    </div>
  );
};

export default withLayout(TabMakerLayout)(TabMakerPage);
