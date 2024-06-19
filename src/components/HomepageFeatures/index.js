import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Facíl de usar',
    Svg: require('@site/static/assets/images/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Guía paso a paso con todo el código y comentada paso a paso.
      </>
    ),
  },
  {
    title: 'Implantación de JWT',
    Svg: require('@site/static/assets/images/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Guía paso a paso de como implementar Json Web Token en nuestra API.
        Adaptado a la última versión de Larbel.
      </>
    ),
  },
  {
    title: 'Con conceptos',
    Svg: require('@site/static/assets/images/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Con definición de conceptos mas usuales en Laravel (con ejemplos).
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
