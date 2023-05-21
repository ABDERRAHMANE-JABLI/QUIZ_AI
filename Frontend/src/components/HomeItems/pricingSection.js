import React from 'react'
import table01 from '../../image/pricing-table-01.png'
import imgLine from '../../image/heading-line-dec.png'

const PricingSection = () => {
  return (
    <div id="pricing" className="pricing-tables">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="section-heading">
            <h4>Nous Avons Les Meilleurs  <em>Prix</em> Que Vous Pouvez Obtenir</h4> 
            <img src={imgLine} alt="line heading image"/>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="pricing-item-regular">
            <span className="price">$0</span>
            <h4>Plan Universitaire</h4>
            <div className="icon">
              <img src={table01} alt="pricing card"/>
            </div>
            <ul>
              <li>Chaque Année</li>
              <li>10 Exams</li>
              <li className="non-function">Life-time Support</li>
              <li className="non-function">Premium Add-Ons</li>
              <li className="non-function">Fastest Network</li>
              <li className="non-function">More Options</li>
            </ul>
            <div className="border-button">
              <a href="#">Achetez ce Plan Maitenant</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="pricing-item-pro">
            <span className="price">$20</span>
            <h4>Plan Standard</h4>
            <div className="icon">
              <img src={table01} alt="pricing card"/>
            </div>
            <ul>
              <li>Chaque Année</li>
              <li>30 Exams</li>
              <li>Life-time Support</li>
              <li>Premium Add-Ons</li>
              <li className="non-function">Fastest Network</li>
              <li className="non-function">More Options</li>
            </ul>
            <div className="border-button">
              <a href="#">Achetez ce Plan Maitenant</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="pricing-item-regular">
            <span className="price">$35</span>
            <h4>Plan Premium</h4>
            <div className="icon">
              <img src={table01} alt="pricing card"/>
            </div>
            <ul>
              <li>Chaque Année</li>
              <li>100 Exams</li>
              <li>Life-time Support</li>
              <li>Premium Add-Ons</li>
              <li>Fastest Network</li>
              <li>More Options</li>
            </ul>
            <div className="border-button">
              <a href="#">Achetez ce Plan Maitenant</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 
  )
}

export default PricingSection