import { items } from "../assets/items";

type Item = (typeof items)[number];

type Props = {
  item: Item | null;
};

export function ItemInfoContainer({ item }: Props) {
  if (!item) return null;

  return (
    <div
      className="
        overflow-hidden
        w-full max-w-[500px]
        mx-auto mt-5
        bg-white
        border border-[var(--border)] rounded-[6px]
      "
    >
      {/* Image Container */}
      <div
        className="
          flex
          w-full h-[180px]
          bg-[#f8f8f8]
          items-center justify-center
          sm:h-[220px]
          md:h-[260px]
        "
      >
        <img
          src={item.imgSrc}
          alt={item.name}
          className="object-contain max-h-[160px] max-w-[92%] sm:max-h-[200px] md:max-h-[230px]"
        />
      </div>

      {/* Info Section */}
      <div className="px-3 py-3 border-t border-[var(--border)] sm:px-4 sm:py-4">
        {/* Item Name */}
        <div
          className="
            font-bold text-[14px] leading-snug text-left text-[var(--text)] break-words
            sm:text-[15px]
          "
        >
          {item.name}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap mt-2 gap-1.5 sm:gap-2">
          {item.metadata?.map((meta, index) => (
            <span
              key={index}
              className="
                px-2 py-[2px]
                text-[10px] font-medium tracking-[0.3px] text-[#555] whitespace-nowrap
                bg-[#f0f0f0]
                rounded-[4px] border border-[#ddd]
                uppercase
                sm:text-[11px]
              "
            >
              {meta}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
