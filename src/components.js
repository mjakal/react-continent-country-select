export const FlagComponent = props => {
  const { countryCode } = props;

  return <i />;
  /*
  return (
    <Suspense fallback={<i />}>
      <i
        style={{ width: '30px' }}
        className={`flag-icon flag-icon-${countryCode.toLowerCase()} mr-1`}
      />
    </Suspense>
  );
  */
};

export const ToggleIcon = ({ isActive }) => {
  const iconClass = isActive
    ? 'fa fa-angle-double-up'
    : 'fa fa-angle-double-down';

  return <i className={`${iconClass} mr-1`} />;
};
