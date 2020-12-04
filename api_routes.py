from flask import render_template, make_response, request, jsonify
from app import app, api
from flask_restx import Resource
from google.cloud import bigquery

client = bigquery.Client()


@api.route("/chartData")
class ChartPage(Resource):

    def get(self):
        data = self.fetchBigQueryData()
        return jsonify(data)

    def post(self):
        pass

    def fetchBigQueryData(self):
        query_job = client.query(""" SELECT
            licenses.license as license,
            count(*) as total
            FROM
            `bigquery-public-data.github_repos.sample_repos` as repo inner join `bigquery-public-data.github_repos.licenses` as licenses on repo.repo_name = licenses.repo_name
            GROUP BY license
            order by total desc
            LIMIT 5
        """)

        results = [dict(row) for row in query_job]
        return results
