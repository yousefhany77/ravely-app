import module from "./Loader.module.css";
interface Props {
  className?: string;
}
function Loader({ className }: Props) {
  return (
    <div className={`${module.wrapper} ${className}`}>
      <div className={`${module.circle} `}></div>
      <div className={`${module.circle} `}></div>
      <div className={`${module.circle} `}></div>
      <div className={module.shadow}></div>
      <div className={module.shadow}></div>
      <div className={module.shadow}></div>
    </div>
  );
}

export default Loader;
