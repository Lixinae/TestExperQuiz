from flask import request, jsonify
from flask_restx import Resource
from google.cloud import bigquery

from app import api

client = bigquery.Client()


@api.route("/BarChartData")
class BarChartData(Resource):
    def get(self):
        pass

    def post(self):
        get_data = request.get_json()
        # Todo -> Ajouter de la sécurité
        limit = get_data["limit"]
        data = self.fetchBigQueryData(limit)
        return jsonify(data)

    def fetchBigQueryData(self, limit_val):
        query = """ 
            SELECT arr.name AS LANGUAGE,
            sum(arr.bytes) AS total_bytes
            FROM `bigquery-public-data.github_repos.languages`, UNNEST(LANGUAGE) arr
            GROUP BY language
            order by total_bytes desc
            LIMIT ?
        """
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter(None, "INT64", limit_val),
            ]
        )
        query_job = client.query(query, job_config=job_config)  # Make an API request.
        results = [dict(row) for row in query_job]
        return results


@api.route("/PieChartData")
class PieChartData(Resource):

    def get(self):
        pass

    def post(self):
        get_data = request.get_json()
        # Todo -> Ajouter de la sécurité
        limit = get_data["limit"]
        data = self.fetchBigQueryData(limit)
        return jsonify(data)

    def fetchBigQueryData(self, limit_val):
        query = """ 
            SELECT licenses.license as license,
            count(*) as total
            FROM
            `bigquery-public-data.github_repos.sample_repos` as repo inner join `bigquery-public-data.github_repos.licenses` as licenses on repo.repo_name = licenses.repo_name
            GROUP BY license
            order by total desc
            LIMIT ?
        """
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter(None, "INT64", limit_val),
            ]
        )
        query_job = client.query(query, job_config=job_config)  # Make an API request.
        results = [dict(row) for row in query_job]
        return results
