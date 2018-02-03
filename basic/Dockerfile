FROM xaxiseng/base-java8
MAINTAINER mStore Backend Team
COPY ["target/mstoreui-testing-basic-*.jar", "run.sh", "/opt/mstoreui-testing/"]
RUN chmod +x /opt/mstoreui-testing/run.sh
ENTRYPOINT ["/opt/mstoreui-testing/run.sh"]
#VOLUME /opt/mstoreui-testing
EXPOSE 8080
