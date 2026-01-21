package services

import (
	"context"
	"math"
	"strconv"
	"time"

	"github.com/ahnaf-asif/chandabaz/internal/database"
	"github.com/ahnaf-asif/chandabaz/internal/models"
)


type SeverityStats struct {
	Mild             int `json:"mild"`
	SevereThreat     int `json:"severe_threat"`
	ViolenceInvolved int `json:"violence_involved"`
}

type ChartData struct {
	Label string `json:"label"`
	Count int    `json:"count"`
}

type PieChartData struct {
	Label      string  `json:"label"`
	Percentage float64 `json:"percentage"`
}

type DashboardStats struct {
	TotalReport                  int64           `json:"total_report"`
	TotalSeats                   int64           `json:"total_seats"`
	TotalReportsSinceLastSaturday int64          `json:"total_reports_since_last_saturday"`
	SeverityPercentage           SeverityStats   `json:"severity_percentage"`
	BarChartData                 []ChartData     `json:"bar_chart_data"`
	ReportTypePieChart           []PieChartData  `json:"report_type_pie_chart"`
}

func UpdateReportStats(ctx context.Context,report *models.Report) {
	rdb := database.RedisClient
	pipe := rdb.Pipeline()


	pipe.Incr(ctx, "stats:total_reports")
	pipe.ZIncrBy(ctx, "stats:seats_leaderboard", 1, report.Seat)

	pipe.HIncrBy(ctx, "stats:severity", report.Severity, 1)

	pipe.HIncrBy(ctx, "stats:report_types", report.ReportType, 1)

	pipe.Exec(ctx)
}

func GetDashboardStats(ctx context.Context) (*DashboardStats, error) {
	rdb := database.RedisClient
	stats := &DashboardStats{}

	
	pipe := rdb.Pipeline()
	
	totalCmd := pipe.Get(ctx, "stats:total_reports")
	uniqueSeatsCmd := pipe.ZCard(ctx, "stats:seats_leaderboard")
	sevCmd := pipe.HGetAll(ctx, "stats:severity")
	typesCmd := pipe.HGetAll(ctx, "stats:report_types")
	topSeatsCmd := pipe.ZRevRangeWithScores(ctx, "stats:seats_leaderboard", 0, 9) 

	_, err := pipe.Exec(ctx)
	if err != nil {
		return nil, err
	}

	
	stats.TotalReport, _ = totalCmd.Int64()
	stats.TotalSeats = uniqueSeatsCmd.Val()

	
	sevMap := sevCmd.Val()
	stats.SeverityPercentage = calculateSeverityPercentages(sevMap)

	
	for _, z := range topSeatsCmd.Val() {
		stats.BarChartData = append(stats.BarChartData, ChartData{
			Label: z.Member.(string),
			Count: int(z.Score),
		})
	}


	typeMap := typesCmd.Val()
	stats.ReportTypePieChart = calculateTypePercentages(typeMap)

	
	stats.TotalReportsSinceLastSaturday = countReportsSinceSaturday()

	return stats, nil
}



func countReportsSinceSaturday() int64 {
	var count int64
	
	
	now := time.Now()
	offset := int(now.Weekday() + 1) % 7 
	lastSaturday := now.AddDate(0, 0, -offset).Truncate(24 * time.Hour) 

	database.DB.Model(&models.Report{}).
		Where("created_at >= ?", lastSaturday).
		Count(&count)
		
	return count
}

func calculateSeverityPercentages(data map[string]string) SeverityStats {
	mild := parseStrToInt(data["Mild Pressure"]) 
	severe := parseStrToInt(data["Severe Threat"])
	violence := parseStrToInt(data["Violence Involved"])
	
	total := float64(mild + severe + violence)
	if total == 0 { return SeverityStats{} }

	return SeverityStats{
		Mild:             int((float64(mild) / total) * 100),
		SevereThreat:     int((float64(severe) / total) * 100),
		ViolenceInvolved: int((float64(violence) / total) * 100),
	}
}

func calculateTypePercentages(data map[string]string) []PieChartData {
	var total float64
	parsed := make(map[string]float64)

	for k, v := range data {
		val := float64(parseStrToInt(v))
		parsed[k] = val
		total += val
	}

	var result []PieChartData
	keys := []string{"Terrorism", "Illegal Occupation", "Extortion", "Administrative Harassment", "Business Harassment", "Others"}

	for _, k := range keys {
		count := parsed[k]
		percentage := 0.0
		if total > 0 {
			percentage = math.Round((count / total) * 100)
		}
		
		result = append(result, PieChartData{
			Label:      k,
			Percentage: percentage,
		})
	}
	return result
}

func parseStrToInt(s string) int {
    if s == "" {
        return 0
    }
    val, err := strconv.Atoi(s)
    if err != nil {
        return 0
    }
    return val
}