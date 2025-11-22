import loading_icon from "@/assets/icons/loading_icon.svg";

export function Loading() {
  return (
    <div className="bg-background-primary flex h-full w-full items-center justify-center">
      <img
        src={loading_icon}
        role="status"
        aria-label="Loading"
        className="size-10 animate-spin"
      />
    </div>
  );
}
