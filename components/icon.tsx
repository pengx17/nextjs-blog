import "material-design-icons-iconfont";

export function Icon({ name }) {
  return (
    <i className="material-icons" style={{ fontSize: "1em" }}>
      {name}
    </i>
  );
}
