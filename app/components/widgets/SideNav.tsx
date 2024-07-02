import clsx from "clsx";

const SideNav = () => {
  return (
    <div className="w-full h-fit flex flex-col py-2 gap-2 md:w-80 rounded-lg bg-white shadow">
      {[
        {
          label: "Tweets",
          active: true,
        },
        {
          label: "Tweets & replies",
        },
        {
          label: "Media",
        },
        {
          label: "Likes",
        },
      ].map((item) => (
        <div
          className={clsx(
            "p-4 text-sm font-semibold hover:bg-gray-700 text-gray-300 border-l-4 cursor-pointer border-white hover:border-primary",
            item?.active && "!border-primary text-primary"
          )}
          key={item.label}
        >
          {item?.label}
        </div>
      ))}
    </div>
  );
};

export default SideNav;
