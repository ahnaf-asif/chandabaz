package models

import (
	"gorm.io/gorm"
)

type Report struct {
	gorm.Model 

	Division  string `gorm:"not null;index" json:"division"`
	District  string `gorm:"not null;index" json:"district"`
	Seat      string `gorm:"not null;index" json:"seat"`
	ReportType string `gorm:"not null;index" json:"type_of_complaint"`
	Severity   string `gorm:"not null;index" json:"severity"`
	Description string `gorm:"type:text;not null" json:"description"`
	Status       string   `gorm:"default:'pending';index" json:"status"`
	EvidenceJSON []string `gorm:"serializer:json" json:"evidence_urls,omitempty"` 
}