import i18n from "../../i18n.ts";

const LanguageSwitcher = () => {
  const lngs = {
    de: {
      nativeName: 'DE',
      flag: 'https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png'
    },
    en: {
      nativeName: 'EN',
      flag: 'https://www.countryflags.com/wp-content/uploads/united-kingdom-flag-png-large.png'
    }
  };

  return (
    <>
      {Object.keys(lngs).map((lng) => (
        <button
          key={lng}
          style={{
            fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
            backgroundColor: 'transparent',
            border: 'none'
          }}
          type="submit"
          onClick={() => i18n.changeLanguage(lng)}
        >
          <div className={'d-flex my-auto justify-content-center align-items-center'}>
            {/*// @ts-expect-error*/}
            <img height={20} width={30} src={lngs[lng].flag} alt=""/>
            {/*// @ts-expect-error*/}
            <span className="mx-1">{lngs[lng].nativeName}</span>
          </div>
        </button>
      ))}
    </>
  )

}


export default LanguageSwitcher