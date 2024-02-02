export const styles = {
  blue: { color: '#185875' },
  yellow: { color: '#FFF842' },
  container: {
    th: {
      h1: {
        fontWeight: 'bold',
        fontSize: '1em',
        textAlign: 'left',
        color: '#185875',
      },
    },
    td: {
      fontWeight: 'normal',
      fontSize: '1em',
      WebkitBoxShadow: '0 2px 2px -2px #0E1119',
      MozBoxShadow: '0 2px 2px -2px #0E1119',
      boxShadow: '0 2px 2px -2px #0E1119',
    },
    common: {
      textAlign: 'left',
      overflow: 'hidden',
      width: '80%',
      margin: '0 auto',
      display: 'table',
      padding: '0 0 8em 0',
    },
    cellPadding: {
      paddingBottom: '2%',
      paddingTop: '2%',
      paddingLeft: '2%',
    },
    oddRow: {
      backgroundColor: '#323C50',
    },
    evenRow: {
      backgroundColor: '#2C3446',
    },
    thBackground: {
      backgroundColor: '#1F2739',
    },
    firstColumn: {
      color: '#FB667A',
    },
    hoverRow: {
      backgroundColor: '#464A52',
      WebkitBoxShadow: '0 6px 6px -6px #0E1119',
      MozBoxShadow: '0 6px 6px -6px #0E1119',
      boxShadow: '0 6px 6px -6px #0E1119',
    },
    hoverCell: {
      backgroundColor: '#FFF842',
      color: '#403E10',
      fontWeight: 'bold',
      boxShadow: '#7F7C21 -1px 1px, #7F7C21 -2px 2px, #7F7C21 -3px 3px, #7F7C21 -4px 4px, #7F7C21 -5px 5px, #7F7C21 -6px 6px',
      transform: 'translate3d(6px, -6px, 0)',
      transitionDelay: '0s',
      transitionDuration: '0.4s',
      transitionProperty: 'all',
      transitionTimingFunction: 'line',
    },
  },
  mediaQuery: {
    max800px: {
      td: {
        nthChild4: {
          display: 'none',
        },
      },
      th: {
        nthChild4: {
          display: 'none',
        },
      },
    },
  },
};
