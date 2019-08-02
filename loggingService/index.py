from werkzeug.wrappers import Request
from werkzeug.serving import run_simple
from django.http import HttpResponse

from jsonrpc import JSONRPCResponseManager, dispatcher

@Request.application
def application(request):
    dispatcher["echo"] = lambda s: s
    dispatcher["add"] = lambda a, b: a + b
    print('[server] got request')
    print('[server] processed request')
    return HttpResponse(response_status=200)

if __name__ == '__main__':
    run_simple('localhost', 4000, application)