"use client"

import { GridPattern } from '../GridPattern'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__container container">
        <div className="hero__content">
          <div className="hero__badge">
            Maintenance Reporting Platform
          </div>
          
          <h1 className="hero__title">
            Report facility issues before they become expensive.
          </h1>
          
          <p className="hero__description">
            Maintena simplifies maintenance reporting by allowing employees to submit issues with photos, assign technicians, monitor repairs, and analyze maintenance performance from one modern platform.
          </p>
          
          <div className="hero__actions">
            <a href="#report" className="btn btn-primary">
              Report Issue
            </a>
            <a href="#dashboard" className="btn btn-secondary">
              View Dashboard
            </a>
          </div>
          
          <div className="hero__trusted">
            <span className="hero__trusted-label">Trusted by</span>
            <div className="hero__trusted-list">
              <span>Schools</span>
              <span>Municipalities</span>
              <span>Companies</span>
              <span>Hospitals</span>
            </div>
          </div>
        </div>
        
        <div className="hero__visual">
          <div className="hero__grid-pattern">
            <GridPattern
              squares={[
                [4, 4],
                [5, 1],
                [8, 2],
                [5, 3],
                [5, 5],
                [10, 10],
                [12, 15],
                [15, 10],
                [10, 15],
                [15, 10],
                [10, 15],
                [15, 10],
              ]}
              className="hero__grid-pattern-svg"
            />
          </div>
          <div className="hero__dashboard">
            <div className="hero__dashboard-header">
              <div className="hero__dashboard-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="hero__dashboard-title">Maintenance Dashboard</span>
            </div>
            
            <div className="hero__dashboard-content">
              <div className="hero__stats-row">
                <div className="hero__stat-card">
                  <span className="hero__stat-value">24</span>
                  <span className="hero__stat-label">Open Requests</span>
                </div>
                <div className="hero__stat-card">
                  <span className="hero__stat-value">12</span>
                  <span className="hero__stat-label">Resolved Today</span>
                </div>
                <div className="hero__stat-card">
                  <span className="hero__stat-value">8</span>
                  <span className="hero__stat-label">Pending Repairs</span>
                </div>
                <div className="hero__stat-card">
                  <span className="hero__stat-value">2.4h</span>
                  <span className="hero__stat-label">Avg Resolution</span>
                </div>
              </div>
              
              <div className="hero__table">
                <div className="hero__table-header">
                  <span>Issue</span>
                  <span>Priority</span>
                  <span>Status</span>
                  <span>Assigned</span>
                </div>
                <div className="hero__table-row">
                  <span>HVAC System - Building A</span>
                  <span className="hero__badge-high">High</span>
                  <span className="hero__badge-progress">In Progress</span>
                  <span>John M.</span>
                </div>
                <div className="hero__table-row">
                  <span>Elevator #2 Maintenance</span>
                  <span className="hero__badge-critical">Critical</span>
                  <span className="hero__badge-pending">Pending</span>
                  <span>Sarah K.</span>
                </div>
                <div className="hero__table-row">
                  <span>Lighting - Floor 3</span>
                  <span className="hero__badge-medium">Medium</span>
                  <span className="hero__badge-completed">Completed</span>
                  <span>Mike R.</span>
                </div>
              </div>
              
              <div className="hero__chart-bar">
                <div className="hero__chart-bar-fill" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero